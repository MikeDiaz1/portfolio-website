# Michael Diaz-Stewart — Portfolio

A personal portfolio for medical-image machine learning, software, and interactive projects. The home page brings together professional experience, education, awards, and selected publications; selecting a project opens its story in the main view while the project list stays alongside it.

Built with **Svelte 5, SvelteKit 3, and TypeScript**, with fully static output for GitHub Pages.

![Portfolio preview with work experience, education, publications, and a project sidebar](docs/preview.jpg)

## Explore

The Portfolio panel contains 17 entries grouped into research, websites and previous work, and games and simulation. Research includes three linked thesis parts, endometrial biopsy tumor annotation, and retinal OCT classification. Every entry has its own address, such as `/projects/pixel-tower-defense/`, so projects can be bookmarked, shared, opened in a new tab, or reached using browser Back and Forward.

- [GitHub](https://github.com/MikeDiaz1)
- [LinkedIn](https://www.linkedin.com/in/michael-diaz-stewart-7547ab271/)
- [Kaggle](https://www.kaggle.com/michaeldiazstewart)

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

Content and presentation live in these files:

| File | What to change |
| --- | --- |
| `src/lib/data/profile.ts` | Name, tagline, profile links, portrait, experience, education, awards, publications, and posters |
| `src/lib/data/projects.ts` | Project order, slugs, summaries, images, descriptions, topics, resource links |
| `src/app.css` | Colours, typography, spacing, and responsive layout |
| `static/` | Images, favicon, and an optional résumé PDF |

### Profile and links

Set the destinations in `profile.links`. External URLs, `mailto:` links, and `tel:` links work directly. For a file in `static/`, use its path without a leading slash:

```ts
{ label: 'Resume', href: 'resume.pdf' }
{ label: 'Contact', href: 'mailto:hello@example.com' }
```

Add `static/resume.pdf` before setting that link. An empty destination renders a muted, unavailable label. Resume currently uses this state; Contact is omitted.

For a portrait, add your image to `static/images/` and set `profile.avatar` to, for example, `'images/portrait.jpg'`. An empty value displays the silhouette.

### Experience, education, publications, and posters

Edit the `experience`, `education`, `publications`, and `posterPresentations` arrays in `src/lib/data/profile.ts`. Work entries include dates, location, work arrangement, employment type, and a `bullets` array for responsibilities or achievements. Set `organisationUrl` to a full URL to make the company name clickable; leave it empty for plain text.

Both work and education entries have `logo`, `initials`, and `bullets` fields. Add a company or university logo to `static/images/` and set its path, for example `images/ubc.svg`. Empty logo fields display the initials. Each string in `bullets` becomes a separate bullet; use `\n` within a string for an explicit line break. Empty arrays render without a list.

Publication DOI links are generated from each entry's `doi` value. To add posters, uncomment the example in `posterPresentations` and supply a `title`, `event`, and `date`. Optional fields are `authors`, `location`, and `href`. The link can be a full URL or a path such as `posters/my-poster.pdf` for a file in `static/`. The Poster presentations subsection appears below publications when the array contains entries.

### Projects

Add or edit entries in the `projects` array. Every entry becomes a sidebar card and a prerendered page automatically. The array order controls category lists and the “Next project” links: research, games and simulation, then websites. In All, `pinnedSlugs` in `ProjectSidebar.svelte` places Further Down, Still and Image-based biomarker prediction first, without duplicating them in their groups.

- Use a unique, URL-friendly slug, such as `my-project`. Keep published slugs stable so existing links continue to work.
- Use `aliases` when renaming a project. `/projects/nostalgia-simulator/` still opens Nostalgia Desktop, whose current address is `/projects/nostalgia-desktop/`.
- Emergent Sandbox uses `/projects/emergent-sandbox/`; its earlier `/projects/emergent-garden/` and `/projects/emergence-playground/` addresses remain available as aliases.
- Set `group` for the sidebar heading and `format` to `research`, `gallery`, `website`, `compact`, or `placeholder` for the appropriate layout.
- Set `filterCategory` to `Machine Learning`, `Game`, or `Web`. All is selected initially and shows pinned projects first. Category filters use their natural order; Game starts with Further Down, Still, Nostalgic desktop, and Emergent Sandbox.
- Put images in `static/images/projects/` and set `image` to its path without a leading slash. Supply the actual `imageWidth` and `imageHeight`, descriptive `imageAlt` text, and an optional `imageCaption`.
- Use `results` and `resultNote` to show research metrics with their evaluation context. Project headers use a single divider below the summary.
- Use `sections` for the project story and `links` for live demos, papers, or repositories. Resource links should use complete URLs.
- Use `featuredLink` with a label, description and URL for a prominent resource beneath the project summary, such as the Further Down, Still soundtrack.
- Add `gallery` images with dimensions, captions, and optional `portrait: true`. Images retain their proportions and open in an enlarged overlay, dismissed with Close, Escape, or a click outside. `related` lists project slugs for the thesis navigation.
- Rebuild after changing content.

The entries use Michael's project presentation, thesis defence slides, screenshots, and supplied descriptions; see [content and image sources](docs/project-sources.md). All project placeholders have been replaced with supplied content and images. [Artwork notes and original prompts](docs/artwork.md) document the retired illustrative banners.

## Deploy to GitHub Pages

The included [GitHub Actions workflow](.github/workflows/deploy.yml) checks the project, builds it, and deploys the `build/` directory.

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
│   ├── cms-reference-labels/index.html
│   ├── survival-modelling/index.html
│   ├── retinal-oct/index.html
│   ├── nostalgia-desktop/index.html
│   ├── nostalgia-simulator/index.html
│   └── ... (every project and alias)
├── images/
└── _app/
```

Direct links and refreshes are served as real HTML documents. No hash router or redirect workaround is required. A custom static 404 page handles missing addresses. This follows [SvelteKit's static deployment guidance](https://svelte.dev/docs/kit/adapter-static).

On wide screens the layout sits in a centered container with a maximum width of 1240px. The fixed profile header spans both columns, with a wider resume panel and a narrow, independently scrolling project list below. The list keeps its scroll position when switching projects. On smaller screens the layout becomes a single column, with projects below the main content. Keyboard focus styles, a skip link, active-project announcements, and reduced-motion support are included.

## Verification

Keep changes lightweight: run `npm run check` and `npm run build`, then briefly inspect the affected pages at desktop and mobile widths using `npm run preview`. This site does not maintain a browser test suite.

