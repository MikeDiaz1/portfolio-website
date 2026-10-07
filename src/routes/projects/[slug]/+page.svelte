<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { profile } from '#lib/data/profile.ts';
  import Icon from '#lib/components/Icon.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.project.title} — {profile.name}</title>
  <meta name="description" content={data.project.summary} />
</svelte:head>

{#key data.project.slug}
  <article class="project-detail" aria-labelledby="project-title">
    <a class="back-link" href={resolve('/')}><Icon name="back" size={20} />Back to overview</a>
    <p class="eyebrow">{data.project.category}</p>
    <h1 id="project-title">{data.project.title}</h1>
    <p class="project-lead">{data.project.summary}</p>
    <figure class="project-hero">
      <img src={asset(data.project.image)} alt={data.project.imageAlt} width="1536" height="512" />
    </figure>
    <p class="project-introduction">{data.project.introduction}</p>
    <ul class="project-tags" aria-label="Project topics">
      {#each data.project.tags as tag}<li>{tag}</li>{/each}
    </ul>
    <div class="project-sections">
      {#each data.project.sections as section}
        <section>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </section>
      {/each}
    </div>
    {#if data.project.links.length}
      <nav class="project-links" aria-label="Project resources">
        {#each data.project.links as link}
          <a href={link.href} rel="noopener noreferrer">{link.label}<Icon name="arrow" size={20} /></a>
        {/each}
      </nav>
    {/if}
    <a class="next-project" href={resolve('/projects/[slug]', { slug: data.nextProject.slug })}>
      <span><span class="eyebrow">Next project</span><span class="next-title">{data.nextProject.title}</span></span>
      <Icon name="arrow" size={28} />
    </a>
  </article>
{/key}
