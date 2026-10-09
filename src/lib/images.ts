import { asset } from '$app/paths';
import type { AssetPath } from '$app/types';
import manifest from './generated/images.json';

type ImageVariants = { width: number; height: number; sources: { src: string; width: number }[] };
const images: Record<string, ImageVariants> = manifest;

export const imageSizes = {
  thumbnail: '(min-width: 1101px) 336px, (min-width: 901px) 260px, (min-width: 760px) 696px, (min-width: 601px) calc(100vw - 64px), calc(100vw - 44px)',
  figure: '(min-width: 1101px) 824px, (min-width: 901px) calc(100vw - 374px), (min-width: 760px) 696px, (min-width: 601px) calc(100vw - 64px), calc(100vw - 44px)',
  gallery: '(min-width: 1101px) 403px, (min-width: 901px) calc(50vw - 196px), (min-width: 760px) 339px, (min-width: 601px) calc(50vw - 41px), calc(100vw - 44px)'
};

export function optimizedImage(src: string, preferredWidth = 960) {
  const image = images[src];
  const sources = image?.sources ?? [];
  const preview = sources.find((source) => source.width >= preferredWidth) ?? sources.at(-1);
  return {
    src: asset((preview?.src ?? src) as AssetPath),
    srcset: sources.length ? sources.map((source) => `${asset(source.src as AssetPath)} ${source.width}w`).join(', ') : undefined,
    width: image?.width,
    height: image?.height
  };
}
