<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
</script>

<svelte:head><title>Page not found — Portfolio</title></svelte:head>
<section class="error-page">
  <p class="eyebrow">{page.status}</p>
  <h1>{page.status === 404 ? 'A little off the path.' : 'Something went wrong.'}</h1>
  <p>{page.error?.message ?? 'Please try again.'}</p>
  <a href={resolve('/')}>Back to work &amp; education <span aria-hidden="true">→</span></a>
</section>
