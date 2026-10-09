import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { projects } from '../src/lib/data/projects.ts';
import { profile, experience, education } from '../src/lib/data/profile.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = path.join(root, 'static/images/optimized');
const manifestPath = path.join(root, 'src/lib/generated/images.json');
const webpOptions = { quality: 88, effort: 5, smartSubsample: true };
const images = new Map();

function include(src, widths) {
  if (!src || !/\.(png|jpe?g|webp)$/i.test(src)) return;
  images.set(src, [...new Set([...(images.get(src) ?? []), ...widths])].sort((a, b) => a - b));
}

for (const project of projects) {
  include(project.image, [480, 960, 1600]);
  for (const image of project.gallery ?? []) include(image.src, [480, 960, 1600]);
}
include(profile.avatar, [88, 176]);
for (const entry of [...experience, ...education]) include(entry.logo, [40, 80]);

await mkdir(outputDirectory, { recursive: true });
await mkdir(path.dirname(manifestPath), { recursive: true });
const manifest = {};
let generated = 0;

for (const [src, requestedWidths] of images) {
  const input = await readFile(path.join(root, 'static', src));
  const metadata = await sharp(input).metadata();
  const { width, height } = metadata.autoOrient;
  const widths = [...new Set(requestedWidths.map((size) => Math.min(size, width)))];
  const hash = createHash('sha256').update(input).update(JSON.stringify(webpOptions)).digest('hex').slice(0, 12);
  const name = path.parse(src).name;
  const sources = [];

  for (const size of widths) {
    // Keep an existing WebP when it already has the required dimensions.
    if (size === width && metadata.format === 'webp') {
      sources.push({ src, width: size });
      continue;
    }
    const filename = `${name}-${hash}-${size}.webp`;
    const destination = path.join(outputDirectory, filename);
    try {
      await stat(destination);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      await sharp(input).rotate().resize({ width: size, withoutEnlargement: true }).webp(webpOptions).toFile(destination);
      generated++;
    }
    sources.push({ src: `images/optimized/${filename}`, width: size });
  }
  manifest[src] = { width, height, sources };
}

// Avoid unnecessary hot reloads when the sources have not changed.
const json = JSON.stringify(manifest, null, 2) + '\n';
let previous;
try { previous = await readFile(manifestPath, 'utf8'); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
if (previous !== json) await writeFile(manifestPath, json);
console.log(`Prepared ${images.size} images; generated ${generated} WebP sizes. Originals are preserved.`);
