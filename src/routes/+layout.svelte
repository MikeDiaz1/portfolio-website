<script lang="ts">
  import type { Snippet } from 'svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import ProfileHeader from '#lib/components/ProfileHeader.svelte';
  import ProjectSidebar from '#lib/components/ProjectSidebar.svelte';
  import '../app.css';

  let { children }: { children: Snippet } = $props();
  let main: HTMLElement;
  const scrollPositions = new Map<string, number>();

  beforeNavigate(({ from }) => {
    if (from && main) scrollPositions.set(from.url.pathname, main.scrollTop);
  });

  afterNavigate(({ to, type }) => {
    if (!main) return;
    main.scrollTop = type === 'popstate' && to ? (scrollPositions.get(to.url.pathname) ?? 0) : 0;
    if (type !== 'enter') main.focus({ preventScroll: true });
  });
</script>

<a class="skip-link" href="#main-content">Skip to main content</a>
<div class="portfolio-shell">
  <ProfileHeader />
  <main id="main-content" class="main-content" tabindex="-1" bind:this={main}>
    {@render children()}
  </main>
  <ProjectSidebar />
</div>
