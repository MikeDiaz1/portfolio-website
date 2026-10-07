<script lang="ts">
  import { resolve } from '$app/paths';
</script>

<svelte:head>
  <title>Page not found — Portfolio</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="error-page">
  <p class="eyebrow">404</p>
  <h1>A little off the path.</h1>
  <p>This page does not exist. Explore a project, or head back to the overview.</p>
  <a href={resolve('/')}>Back to overview <span aria-hidden="true">→</span></a>
</section>
