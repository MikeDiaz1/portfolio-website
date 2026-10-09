<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { page } from '$app/state';
  import { projects, type Project, type ProjectFilter } from '#lib/data/projects.ts';
  import Icon from './Icon.svelte';

  const filters: ProjectFilter[] = ['Machine Learning', 'Game', 'Web'];
  const groupEmojis: Record<ProjectFilter, string> = { 'Machine Learning': '🔬', Game: '🎮', Web: '🌐' };
  const pinnedSlugs = ['further-down-still', 'medical-image-ai'];
  const allProjects = [
    ...pinnedSlugs.flatMap((slug) => projects.filter((project) => project.slug === slug)),
    ...projects.filter((project) => !pinnedSlugs.includes(project.slug))
  ];
  let activeFilter = $state<ProjectFilter | null>(null);
  let projectList: HTMLElement;
  const visibleProjects = $derived(activeFilter ? projects.filter((project) => project.filterCategory === activeFilter) : allProjects);

  function displayGroup(project: Project) {
    return !activeFilter && pinnedSlugs.includes(project.slug) ? 'Pinned 📌' : `${project.group} ${groupEmojis[project.filterCategory]}`;
  }

  function selectFilter(filter: ProjectFilter | null) {
    activeFilter = filter;
    projectList?.scrollTo({ top: 0 });
  }
</script>

<aside class="project-sidebar" aria-labelledby="projects-heading" id="projects">
  <h2 id="projects-heading" class="section-label">Portfolio</h2>
  <div class="project-filters" role="group" aria-label="Filter portfolio">
    <button type="button" class="project-filter" aria-pressed={activeFilter === null} aria-controls="project-list" onclick={() => selectFilter(null)}>All</button>
    {#each filters as filter}
      <button type="button" class="project-filter" aria-pressed={activeFilter === filter} aria-controls="project-list" onclick={() => selectFilter(filter)}>{filter}</button>
    {/each}
  </div>
  <p class="sr-only" aria-live="polite">{visibleProjects.length} projects shown{activeFilter ? ': ' + activeFilter : ': all projects'}.</p>
  <nav id="project-list" class="project-list" aria-label="Portfolio" bind:this={projectList}>
    {#each visibleProjects as project, index (project.slug)}
      {#if index === 0 || displayGroup(visibleProjects[index - 1]) !== displayGroup(project)}
        <p class="project-group">{displayGroup(project)}</p>
      {/if}
      {@const selected = page.params.slug === project.slug || project.aliases?.includes(page.params.slug ?? '')}
      <a class="project-card" data-format={project.format} class:selected href={resolve('/projects/[slug]', { slug: project.slug })} aria-current={selected ? 'page' : undefined}>
        <div class="thumbnail">
          <img src={asset(project.image)} alt="" width={project.imageWidth} height={project.imageHeight} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
        </div>
        <div class="project-card-copy">
          <div class="project-card-title">
            <h3>{project.title}</h3>
            <span class="open-project"><span class="sr-only">{selected ? 'Viewing' : 'Open'}</span><Icon name="arrow" size={21} /></span>
          </div>
          <p>{project.summary}</p>
          <ul class="project-card-tags" aria-label="Topics">
            {#each project.tags.slice(0, 3) as tag}<li>{tag}</li>{/each}
          </ul>
          {#if project.format === 'placeholder'}<span class="project-placeholder-label">Details to come</span>{/if}
        </div>
      </a>
    {/each}
  </nav>
</aside>
