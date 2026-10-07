# Michael Diaz-Stewart — Portfolio

A personal portfolio for medical-image machine learning, software, and interactive projects. The home page brings together professional experience, education, awards, and selected publications; selecting a project opens its story in the main view while the project list stays alongside it.

Built with **Svelte 5, SvelteKit 3, and TypeScript**, with fully static output for GitHub Pages.

![Portfolio preview with work experience, education, publications, and a project sidebar](docs/preview.jpg)

## Explore

The portfolio includes Medical-image AI, Emergent Garden, Nostalgia Simulator, and Further Down, Still. Each has its own address, such as `/projects/emergent-garden/`, so projects can be bookmarked, shared, opened in a new tab, or reached using browser Back and Forward.

- [GitHub](https://github.com/MikeDiaz1)
- [LinkedIn](https://www.linkedin.com/in/michael-diaz-stewart-7547ab271/)

## Run locally

Use Node.js **22.17 or newer**; Node 24 is specified in `.nvmrc`.

Clone or download this repository, open a terminal in its folder, then run:

```sh
npm ci
npm run dev
```

Open the local URL printed in your terminal.

```sh
npm run check    # Svelte and TypeScript diagnostics
npm run build    # Generate the static site in build/
npm run preview  # Preview the production build
```

No API keys, database, or server deployment are needed. Fonts, icons, and images are served locally.

## Make it your own

Most changes only need two files:

| File | What to change |
| --- | --- |
| `src/lib/data/profile.ts` | Name, tagline, profile links, portrait, experience, education, awards, and publications |
| `src/lib/data/projects.ts` | Project order, slugs, summaries, images, descriptions, topics, resource links |
| `src/app.css` | Colours, typography, spacing, and responsive layout |
| `static/` | Images, favicon, and an optional résumé PDF |

### Profile and links

Set the destinations in `profile.links`. External URLs, `mailto:` links, and `tel:` links work directly. For a file in `static/`, use its path without a leading slash:

```ts
{ label: 'Resume', href: 'resume.pdf' }
{ label: 'Contact', href: 'mailto:hello@example.com' }
```

Add `static/resume.pdf` before setting that link. An empty destination renders a muted, unavailable label. Resume and Contact start this way until real destinations are supplied.

For a portrait, add your image to `static/images/` and set `profile.avatar` to, for example, `'images/portrait.jpg'`. An empty value displays the silhouette.

### Experience, education, and publications

Edit the `experience`, `education`, and `publications` arrays in `src/lib/data/profile.ts`. Work entries include dates, location, work arrangement, employment type, and a `bullets` array for responsibilities or achievements. Empty bullet arrays render without a list.

Each work entry also has a `logo` field. Add a company logo to `static/images/companies/` and set its path, for example `images/companies/ubc.svg`. Empty logo fields display a compact initials placeholder. Publication DOI links are generated from each entry's `doi` value.

### Projects

Add or edit entries in the `projects` array. Every entry becomes a sidebar card and a prerendered page automatically. The array order controls both the sidebar and the “Next project” links.

- Use a unique, URL-friendly slug, such as `my-project`. Keep published slugs stable so existing links continue to work.
- Put artwork in `static/images/` and set `image` to its path without a leading slash.
- Add descriptive `imageAlt` text for the full-size project image.
- Use `sections` for the project story and `links` for live demos, papers, or repositories. Resource links should use complete URLs.
- Rebuild after changing content.

The longer descriptions are starter copy based on the example project summaries. Replace them with your own case studies. The four banners are illustrative AI-generated artwork, not actual research data or project screenshots; [artwork notes and prompts](docs/artwork.md) are included. When adapting the template, replace the personal information, project content, social links, and artwork with your own.

## Deploy to GitHub Pages

The included [GitHub Actions workflow](.github/workflows/deploy.yml) checks the project, builds it, runs browser tests against the static files, and deploys the `build/` directory.

1. Push the project and its lockfile to a GitHub repository with a `main` branch.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Open **Actions → Deploy to GitHub Pages → Run workflow**, or push another commit to `main`.
4. Open the URL shown by the deployment when it finishes.

The workflow reads the base path from GitHub Pages. A project repository works at `https://your-username.github.io/your-repository/`; a `your-username.github.io` repository or configured custom domain works at the root. No repository name is hardcoded in the app.

If your default branch has another name, update the workflow's `on.push.branches` value. Configure a custom domain in the repository's Pages settings before rebuilding.

### Preview a repository subpath

To test the same URL structure locally, supply `BASE_PATH` during both build and preview. It must start with a slash and must not end with one.

Bash:

```sh
BASE_PATH=/my-portfolio npm run build
BASE_PATH=/my-portfolio npm run preview
```

PowerShell:

```powershell
$env:BASE_PATH = '/my-portfolio'
npm run build
npm run preview
# When you are done:
Remove-Item Env:BASE_PATH
```

Then open the preview URL with `/my-portfolio/` appended. Leave `BASE_PATH` unset for a root deployment.

## How navigation works

The shared layout contains the profile header and project list. SvelteKit renders the selected page in the left main panel. Cards are ordinary links, enhanced with client-side navigation when JavaScript is available.

`src/routes/+layout.ts` enables prerendering and trailing slashes. The project route's `entries()` function supplies every slug at build time, producing:

```text
build/
├── index.html
├── 404.html
├── .nojekyll
├── projects/
│   ├── medical-image-ai/index.html
│   ├── emergent-garden/index.html
│   ├── nostalgia-simulator/index.html
│   └── further-down-still/index.html
├── images/
└── _app/
```

Direct links and refreshes are served as real HTML documents. No hash router or redirect workaround is required. A custom static 404 page handles missing addresses. This follows [SvelteKit's static deployment guidance](https://svelte.dev/docs/kit/adapter-static).

On wide screens the layout sits in a centered container with a maximum width of 1240px. The fixed profile header spans both columns, with a wider resume panel and a narrow, independently scrolling project list below. The list keeps its scroll position when switching projects. On smaller screens the layout becomes a single column, with projects below the main content. Keyboard focus styles, a skip link, active-project announcements, and reduced-motion support are included.

## Browser tests

```sh
npx playwright install chromium
npm run build
npm test
```

The tests cover project navigation, Back and Forward, direct links, refreshes, independent scrolling, mobile overflow, keyboard access, image loading, missing pages, and navigation without JavaScript.

Tests use a small static file server that serves only `build/`, so they also verify the output works without SvelteKit's development server. To test a repository deployment, set the same `BASE_PATH` for the build and test commands. `PORT` can select a test-server port if the default, 4173, is occupied.

