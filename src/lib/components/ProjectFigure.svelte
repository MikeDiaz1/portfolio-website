<script lang="ts">
  import { asset } from '$app/paths';
  import type { ProjectImage } from '#lib/data/projects.ts';

  let { image, hero = false }: { image: ProjectImage; hero?: boolean } = $props();
</script>

<figure class="project-figure" class:project-hero={hero} class:portrait={image.portrait}>
  <a class="figure-link" href={asset(image.src)} target="_blank" rel="noopener noreferrer" aria-label={'View full-size image: ' + image.alt}>
    <img src={asset(image.src)} alt={image.alt} width={image.width} height={image.height} loading={hero ? 'eager' : 'lazy'} decoding="async" />
    <span class="figure-expand" aria-hidden="true">View full size ↗</span>
  </a>
  {#if image.caption}<figcaption>{image.caption}</figcaption>{/if}
</figure>
