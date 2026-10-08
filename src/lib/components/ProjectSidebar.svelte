<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { page } from '$app/state';
  import { projects } from '#lib/data/projects.ts';
  import Icon from './Icon.svelte';
</script>

<aside class="project-sidebar" aria-labelledby="projects-heading" id="projects">
  <h2 id="projects-heading" class="section-label">Projects / Previous Work</h2>
  <nav class="project-list" aria-label="Projects / Previous Work">
    {#each projects as project, index}
      {#if index === 0 || projects[index - 1].group !== project.group}
        <p class="project-group">{project.group}</p>
      {/if}
      {@const selected = page.params.slug === project.slug || project.aliases?.includes(page.params.slug ?? '')}
      <a class="project-card" data-format={project.format} class:selected href={resolve('/projects/[slug]', { slug: project.slug })} aria-current={selected ? 'page' : undefined}>
        <div class="thumbnail">
          <img src={asset(project.image)} alt="" width={project.imageWidth} height={project.imageHeight} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
        </div>
        <div class="project-card-title">
          <h3>{project.title}</h3>
          <span class="open-project">{selected ? 'Viewing' : 'Open'}<Icon name="arrow" size={21} /></span>
        </div>
        <p>{project.summary}</p>
        {#if project.format === 'placeholder'}<span class="project-placeholder-label">Details to come</span>{/if}
      </a>
    {/each}
  </nav>
</aside>
