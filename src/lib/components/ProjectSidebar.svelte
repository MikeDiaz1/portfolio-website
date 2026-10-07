<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { page } from '$app/state';
  import { projects } from '#lib/data/projects.ts';
  import Icon from './Icon.svelte';
</script>

<aside class="project-sidebar" aria-labelledby="projects-heading" id="projects">
  <h2 id="projects-heading" class="sr-only">Projects</h2>
  <nav class="project-list" aria-label="Projects">
    {#each projects as project}
      {@const selected = page.params.slug === project.slug}
      <a class="project-card" class:selected href={resolve('/projects/[slug]', { slug: project.slug })} aria-current={selected ? 'page' : undefined}>
        <div class="thumbnail">
          <img src={asset(project.image)} alt="" width="1536" height="512" />
        </div>
        <div class="project-card-title">
          <h3>{project.title}</h3>
          <span class="open-project">{selected ? 'Viewing' : 'Open'}<Icon name="arrow" size={21} /></span>
        </div>
        <p>{project.summary}</p>
      </a>
    {/each}
  </nav>
</aside>
