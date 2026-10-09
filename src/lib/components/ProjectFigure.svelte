<script lang="ts">
  import { asset } from '$app/paths';
  import type { ProjectImage } from '#lib/data/projects.ts';
  import { imageSizes, optimizedImage } from '#lib/images.ts';

  let { image, hero = false, sizes = imageSizes.figure }: { image: ProjectImage; hero?: boolean; sizes?: string } = $props();
  let lightbox: HTMLDialogElement;
  let expanded = $state(false);
  const preview = $derived(optimizedImage(image.src));

  function openImage(event: MouseEvent) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (!lightbox?.showModal) return;
    event.preventDefault();
    expanded = true;
    lightbox.showModal();
  }
</script>

<figure class="project-figure" class:project-hero={hero} class:portrait={image.portrait}>
  <a class="figure-link" href={asset(image.src)} onclick={openImage} aria-haspopup="dialog" aria-label={'View full-size image: ' + image.alt}>
    <img src={preview.src} srcset={preview.srcset} sizes={image.portrait ? '240px' : sizes} alt={image.alt} width={preview.width ?? image.width} height={preview.height ?? image.height} loading={hero ? 'eager' : 'lazy'} fetchpriority={hero ? 'high' : 'auto'} decoding="async" />
    <span class="figure-expand" aria-hidden="true">View full size</span>
  </a>
  {#if image.caption}<figcaption>{image.caption}</figcaption>{/if}
</figure>

<dialog class="image-lightbox" bind:this={lightbox} aria-label="Enlarged project image" onclose={() => { expanded = false; }} onclick={(event) => { if (event.target === lightbox) lightbox.close(); }}>
  <div class="image-lightbox-content">
    <button class="image-lightbox-close" type="button" onclick={() => lightbox.close()}>Close <span aria-hidden="true">×</span></button>
    {#if expanded}<img src={asset(image.src)} alt={image.alt} width={preview.width ?? image.width} height={preview.height ?? image.height} decoding="async" />{/if}
    {#if image.caption}<p class="image-lightbox-caption">{image.caption}</p>{/if}
  </div>
</dialog>
