<script lang="ts">
  import { asset } from '$app/paths';
  import type { AssetPath } from '$app/types';
  import { experience, education, publications, posterPresentations, profile, type Experience } from '#lib/data/profile.ts';
  import { optimizedImage } from '#lib/images.ts';

  const visibleExperience = experience.filter((entry) => !entry.additional);
  const additionalExperience = experience.filter((entry) => entry.additional);

  const posterHref = (href: string) => /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href) ? href : asset(href as AssetPath);
</script>

<svelte:head>
  <title>{profile.name} — Medical-image ML & software</title>
  <meta name="description" content={'Work, education, and selected projects by ' + profile.name + '. ' + profile.tagline + '.'} />
</svelte:head>

{#snippet workEntry(entry: Experience)}
  <li class="work-entry">
    <div class="work-meta">
      <span class="work-date">{entry.date}</span>
      <span class="work-location">{entry.location}</span>
      <span class="work-arrangement">{entry.arrangement}</span>
    </div>
    <div class="work-content">
      <div class="work-heading">
        <div class="company-logo" aria-hidden="true">
          {#if entry.logo}
            {@const logo = optimizedImage(entry.logo, 40)}
            <img src={logo.src} srcset={logo.srcset} sizes="40px" alt="" width="40" height="40" loading="eager" decoding="sync" />
          {:else}
            <span>{entry.initials}</span>
          {/if}
        </div>
        <div>
          <h3>{entry.title}</h3>
          <p class="work-organisation">
            {#if entry.organisationUrl}
              <a href={entry.organisationUrl}>{entry.organisation}</a>
            {:else}
              {entry.organisation}
            {/if}<span class="employment-type"><span class="employment-divider" aria-hidden="true"> · </span>{entry.employment}</span>
          </p>
        </div>
      </div>
      {#if entry.bullets.length}
        <ul class="work-bullets">
          {#each entry.bullets as bullet}<li>{bullet}</li>{/each}
        </ul>
      {/if}
    </div>
  </li>
{/snippet}

<div class="home-page">
  <h1 class="sr-only">Experience, education &amp; publications</h1>
  <section aria-labelledby="experience-heading">
    <h2 class="section-label" id="experience-heading">Experience</h2>
    <ol class="work-timeline">
      {#each visibleExperience as entry}
        {@render workEntry(entry)}
      {/each}
    </ol>
    {#if additionalExperience.length}
      <details class="additional-experience">
        <summary>
          <svg class="experience-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span>
            <strong>Additional Experience ({additionalExperience.length})</strong>
            <span class="additional-experience-description">MCAT instruction and pharmacy experience</span>
          </span>
        </summary>
        <ol class="work-timeline" start={visibleExperience.length + 1}>
          {#each additionalExperience as entry}
            {@render workEntry(entry)}
          {/each}
        </ol>
      </details>
    {/if}
  </section>

  <section class="resume-section" aria-labelledby="education-heading">
    <h2 class="section-label" id="education-heading">Education</h2>
    <ul class="work-timeline education-list">
      {#each education as entry}
        <li class="work-entry">
          <div class="work-meta"><span class="work-date">{entry.date}</span></div>
          <div class="work-content">
            <div class="work-heading">
              <div class="company-logo" aria-hidden="true">
                {#if entry.logo}
                  {@const logo = optimizedImage(entry.logo, 40)}
                  <img src={logo.src} srcset={logo.srcset} sizes="40px" alt="" width="40" height="40" loading="eager" decoding="sync" />
                {:else}
                  <span>{entry.initials}</span>
                {/if}
              </div>
              <div>
                <h3>{entry.degree}</h3>
                <p class="work-organisation">{entry.institution}</p>
              </div>
            </div>
            {#if entry.bullets.length}
              <ul class="work-bullets">
                {#each entry.bullets as bullet}<li>{bullet}</li>{/each}
              </ul>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </section>

  <section class="resume-section" aria-labelledby="publications-heading">
    <h2 class="section-label" id="publications-heading">Publications</h2>
    <ol class="publication-list">
      {#each publications as publication}
        <li>
          <p><span class="publication-authors">{publication.authors}</span> {publication.title} <cite>{publication.journal}</cite></p>
          <a href={'https://doi.org/' + publication.doi}>doi:{publication.doi}</a>
        </li>
      {/each}
    </ol>
    {#if posterPresentations.length}
      <section class="poster-section" aria-labelledby="posters-heading">
        <h3 class="section-label" id="posters-heading">Poster presentations</h3>
        <ol class="publication-list">
          {#each posterPresentations as poster}
            <li>
              <p>{#if poster.authors}<span class="publication-authors">{poster.authors}</span> {/if}{poster.title}</p>
              <p class="poster-event"><cite>{poster.event}</cite> · {poster.date}{#if poster.location} · {poster.location}{/if}</p>
              {#if poster.href}<a href={posterHref(poster.href)} aria-label={'View poster: ' + poster.title}>View poster ↗</a>{/if}
            </li>
          {/each}
        </ol>
      </section>
    {/if}
  </section>
</div>
