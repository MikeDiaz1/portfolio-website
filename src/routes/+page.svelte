<script lang="ts">
  import { experience, profile } from '#lib/data/profile.ts';
</script>

<svelte:head>
  <title>{profile.name} — Medical-image ML & software</title>
  <meta name="description" content={'Work, education, and selected projects by ' + profile.name + '. ' + profile.tagline + '.'} />
</svelte:head>

<section class="home-page" aria-labelledby="page-title">
  <div class="page-heading">
    <h1 id="page-title">Work &amp; education</h1>
    <p class="page-intro">Experience, study, and things built along the way.</p>
  </div>
  <ol class="timeline">
    {#each experience as entry}
      <li class="timeline-entry">
        <span class="timeline-date">{entry.date}</span>
        <span class="timeline-marker" aria-hidden="true"></span>
        <div class="timeline-copy">
          <h2>{entry.title}</h2>
          {#if entry.organisation}<p class="organisation">{entry.organisation}</p>{/if}
          <p class="experience-description">{entry.description}</p>
        </div>
      </li>
    {/each}
  </ol>
</section>
