<script lang="ts">
  import { asset } from '$app/paths';
  import type { AssetPath } from '$app/types';
  import { experience, education, publications, profile } from '#lib/data/profile.ts';
</script>

<svelte:head>
  <title>{profile.name} — Medical-image ML & software</title>
  <meta name="description" content={'Work, education, and selected projects by ' + profile.name + '. ' + profile.tagline + '.'} />
</svelte:head>

<div class="home-page">
  <h1 class="sr-only">Experience, education &amp; publications</h1>
  <section aria-labelledby="experience-heading">
    <h2 class="section-label" id="experience-heading">Experience</h2>
    <ol class="work-timeline">
    {#each experience as entry}
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
                <img src={asset(entry.logo as AssetPath)} alt="" width="40" height="40" />
              {:else}
                <span>{entry.initials}</span>
              {/if}
            </div>
            <div>
              <h3>{entry.title}</h3>
              <p class="work-organisation">{entry.organisation}<span class="employment-type"> · {entry.employment}</span></p>
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
    </ol>
  </section>

  <section class="resume-section" aria-labelledby="education-heading">
    <h2 class="section-label" id="education-heading">Education &amp; awards</h2>
    <ul class="education-list">
      {#each education as entry}
        <li>
          <div class="education-heading"><h3>{entry.degree}</h3><span>{entry.date}</span></div>
          <p>{entry.institution}<span class="education-distinction"> · {entry.distinction}</span></p>
          {#if entry.awards}<p class="education-awards">{entry.awards}</p>{/if}
        </li>
      {/each}
    </ul>
  </section>

  <section class="resume-section" aria-labelledby="publications-heading">
    <h2 class="section-label" id="publications-heading">Selected publications</h2>
    <ol class="publication-list">
      {#each publications as publication}
        <li>
          <p><span class="publication-authors">{publication.authors}</span> {publication.title} <cite>{publication.journal}</cite></p>
          <a href={'https://doi.org/' + publication.doi}>doi:{publication.doi}</a>
        </li>
      {/each}
    </ol>
  </section>
</div>
