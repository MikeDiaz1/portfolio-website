<script lang="ts">
  import { asset } from '$app/paths';
  import type { ProjectImage } from '#lib/data/projects.ts';

  let { image, hero = false }: { image: ProjectImage; hero?: boolean } = $props();
  let lightbox: HTMLDialogElement;

  function openImage(event: MouseEvent) {
    event.preventDefault();
    lightbox.showModal();
  }
</script>

<figure class="project-figure" class:project-hero={hero} class:portrait={image.portrait}>
  <a class="figure-link" href={asset(image.src)} onclick={openImage} aria-haspopup="dialog" aria-label={'View full-size image: ' + image.alt}>
    <img src={asset(image.src)} alt={image.alt} width={image.width} height={image.height} loading={hero ? 'eager' : 'lazy'} decoding="async" />
    <span class="figure-expand" aria-hidden="true">View full size</span>
  </a>
  {#if image.caption}<figcaption>{image.caption}</figcaption>{/if}
</figure>

<dialog class="image-lightbox" bind:this={lightbox} aria-label="Enlarged project image" onclick={(event) => { if (event.target === lightbox) lightbox.close(); }}>
  <div class="image-lightbox-content">
    <button class="image-lightbox-close" type="button" onclick={() => lightbox.close()}>Close <span aria-hidden="true">×</span></button>
    <img src={asset(image.src)} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
    {#if image.caption}<p class="image-lightbox-caption">{image.caption}</p>{/if}
  </div>
</dialog>
