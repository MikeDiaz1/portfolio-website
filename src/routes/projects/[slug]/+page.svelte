<script lang="ts">
  import { resolve } from '$app/paths';
  import { profile } from '#lib/data/profile.ts';
  import Icon from '#lib/components/Icon.svelte';
  import ProjectFigure from '#lib/components/ProjectFigure.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.project.title} — {profile.name}</title>
  <meta name="description" content={data.project.summary} />
</svelte:head>

{#key data.project.slug}
  <article class="project-detail" data-format={data.project.format} aria-labelledby="project-title">
    <div class="project-toolbar section-label">
      <span>Portfolio</span>
      <a class="back-link" href={resolve('/')}><Icon name="back" size={15} />Back to overview</a>
    </div>

    <header class="project-heading">
      <p class="eyebrow">{data.project.category}</p>
      <h1 id="project-title">{data.project.title}</h1>
      <p class="project-lead">{data.project.summary}</p>
      {#if data.project.featuredLink}
        <a class="project-featured-link" href={data.project.featuredLink.href} target="_blank" rel="noopener noreferrer">
          <span><strong>{data.project.featuredLink.label}</strong><span>{data.project.featuredLink.description}</span></span>
          <Icon name="arrow" size={24} />
        </a>
      {/if}
    </header>

    <hr class="project-divider" />

    {#if data.project.format === 'placeholder'}
      <p class="placeholder-notice">More details to come. This is a placeholder overview with illustrative artwork.</p>
    {/if}

    <div class="project-opening" class:compact={data.project.format === 'compact'}>
      <p class="project-introduction">{data.project.introduction}</p>

      {#if data.project.results?.length}
        <div class="project-results-block">
          <dl class="project-results">
            {#each data.project.results as result}
              <div><dt>{result.label}</dt><dd>{result.value}</dd></div>
            {/each}
          </dl>
          {#if data.project.resultNote}<p class="result-note">{data.project.resultNote}</p>{/if}
        </div>
      {/if}

      <ProjectFigure hero image={{
        src: data.project.image,
        alt: data.project.imageAlt,
        width: data.project.imageWidth,
        height: data.project.imageHeight,
        caption: data.project.imageCaption
      }} />
    </div>

    <div class="project-sections">
      {#each data.project.sections as section}
        <section>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </section>
      {/each}
    </div>

    {#if data.project.gallery?.length}
      <section class="project-gallery-section" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" class="section-label">{data.project.format === 'research' ? 'Additional figures' : 'Screenshots'}</h2>
        <div class="project-gallery" class:single={data.project.gallery.length === 1}>
          {#each data.project.gallery as image}<ProjectFigure {image} />{/each}
        </div>
      </section>
    {/if}

    <ul class="project-tags" aria-label="Project topics">
      {#each data.project.tags as tag}<li>{tag}</li>{/each}
    </ul>

    {#if data.project.links.length}
      <nav class="project-links" aria-label="Project resources">
        {#each data.project.links as link}
          <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<Icon name="arrow" size={17} /></a>
        {/each}
      </nav>
    {/if}

    {#if data.relatedProjects.length}
      <nav class="related-projects" aria-label="Other parts of this thesis">
        <p class="section-label">Other parts of this thesis</p>
        {#each data.relatedProjects as project}
          <a href={resolve('/projects/[slug]', { slug: project.slug })}>{project.title}<Icon name="arrow" size={17} /></a>
        {/each}
      </nav>
    {/if}

    <a class="next-project" href={resolve('/projects/[slug]', { slug: data.nextProject.slug })}>
      <span><span class="eyebrow">Next project</span><span class="next-title">{data.nextProject.title}</span></span>
      <Icon name="arrow" size={24} />
    </a>
  </article>
{/key}
