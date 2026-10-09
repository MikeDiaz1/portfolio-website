<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import type { AssetPath } from '$app/types';
  import { profile } from '#lib/data/profile.ts';
  import Icon from './Icon.svelte';
  import { optimizedImage } from '#lib/images.ts';

  let downloading = $state(false);
  let downloadError = $state('');

  function linkDestination(href: string) {
    return /^(https?:|mailto:|tel:)/.test(href) ? href : asset(href as AssetPath);
  }

  async function downloadFile(href: string, filename: string) {
    if (downloading) return;
    downloading = true;
    downloadError = '';
    try {
      const response = await fetch(linkDestination(href));
      if (!response.ok) throw new Error('Download failed');
      const url = URL.createObjectURL(await response.blob());
      const download = document.createElement('a');
      download.href = url;
      download.download = filename;
      // Keep this temporary link outside the page's navigation event handlers.
      download.addEventListener('click', (event) => event.stopPropagation());
      document.body.append(download);
      download.click();
      download.remove();
      // Allow the browser to consume the blob before releasing it.
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      downloadError = 'Resume download failed. Please try again.';
    } finally {
      downloading = false;
    }
  }
</script>

<header class="profile-header">
  <a class="identity" href={resolve('/')} data-sveltekit-preload-code="eager" aria-label={profile.name + ' — overview'}>
    <span class="avatar">
      {#if profile.avatar}
        {@const portrait = optimizedImage(profile.avatar, 88)}
        <img src={portrait.src} srcset={portrait.srcset} sizes="(max-width: 600px) 58px, 88px" alt="" width="88" height="88" decoding="async" />
      {:else}
        <svg viewBox="0 0 82 82" fill="none" aria-hidden="true">
          <circle cx="41" cy="41" r="41" fill="#e7e5e1" />
          <path d="M9 73c2-8 12-10 22-15v-8c-4-3-6-8-6-13-3-1-3-7-1-8-1-12 5-17 16-17 12 0 18 6 16 18 3 1 2 7-1 8-1 5-3 9-6 12v8c10 5 20 7 24 15a41 41 0 0 1-64 0Z" fill="#a5a5a3" />
        </svg>
      {/if}
    </span>
    <span class="identity-copy">
      <span class="profile-name">{profile.name}</span>
      <span class="profile-tagline">{profile.tagline}</span>
      <span class="profile-statement">{profile.statement}</span>
    </span>
  </a>
  <nav class="profile-links" aria-label="Profile links">
    {#each profile.links as link, index}
      {#if !link.icon && index > 0 && profile.links[index - 1].icon}<span class="nav-divider" aria-hidden="true"></span>{/if}
      {#if link.href && link.download}
        <button type="button" class="profile-link" disabled={downloading} aria-label="Download resume" onclick={() => downloadFile(link.href, link.download!)}>
          <span>{downloading ? 'Downloading…' : link.label}</span>
        </button>
      {:else if link.href}
        <a href={linkDestination(link.href)} class="profile-link" rel={link.href.startsWith('http') ? 'me noopener noreferrer' : undefined}>
          {#if link.icon}<Icon name={link.icon} size={26} />{/if}
          <span>{link.label}</span>
        </a>
      {:else}
        <span class="profile-link unavailable" aria-disabled="true" title={link.label + ' link has not been added yet'}>
          {#if link.icon}<Icon name={link.icon} size={26} />{/if}
          <span>{link.label}</span>
          <span class="sr-only"> (not yet available)</span>
        </span>
      {/if}
    {/each}
  </nav>
  {#if downloadError}<p class="download-error" role="alert">{downloadError}</p>{/if}
</header>
