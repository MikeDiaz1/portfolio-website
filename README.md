# Portfolio Website

![Portfolio preview with work experience, education, publications, and a project sidebar](docs/preview.jpg)

Built with **Codex**, using **SvelteKit, Svelte and TypeScript**. Hosted as a static site on GitHub Pages.

## Run locally

Use **Node.js 24** (see `.nvmrc`).

Clone or download the repository, then run these commands in its folder:

```sh
npm ci
npm run dev
```

Open the URL printed in your terminal.

```sh
npm run check    # Check types and Svelte code
npm run build    # Build the site
npm run preview  # Preview the build
```

## Customize

| File | What to change |
| --- | --- |
| `src/lib/data/profile.ts` | Profile, experience, education and publications |
| `src/lib/data/projects.ts` | Projects, images, links and display order |
| `src/app.css` | Colours, fonts and layout |
| `static/` | Images, favicon and résumé |

## Deploy to GitHub Pages

The included [workflow](.github/workflows/deploy.yml) checks, builds and deploys the site.

1. Push the repository to GitHub.
2. In **Settings → Pages**, select **GitHub Actions** as the build source.
3. Push to `master` or run **Actions → Deploy to GitHub Pages → Run workflow**.
4. Open the URL shown by the completed deployment.

The site path is configured automatically. For a custom domain, set it in **Settings → Pages** before deploying.

If your default branch is not `master`, update `on.push.branches` in the workflow.

## License

The website implementation code is available under the [MIT License](LICENSE). You may reuse, modify and distribute it, including commercially, provided you retain the copyright and license notices.

This license excludes my portfolio text, project descriptions, research materials, images, artwork, screenshots, résumé and other showcased work. This includes content embedded in `src/lib/data/` and media in `static/` and `docs/`. Rights remain with their respective owners; all rights are reserved unless separately stated. No license to any separate project described or linked here is granted. Third-party materials remain subject to their own licenses.

If you use the site as a template, replace the portfolio content and personal assets with your own.
