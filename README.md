# Personal Portfolio v.1

## Project pages

Every project uses `/projects/:slug`. Shared metadata and homepage ordering live in
`src/data/projects.js`. `src/pages/ProjectDetail.jsx` looks up that data, resets scroll
on navigation, and selects a custom page or `projects/DefaultProjectPage.jsx`.
The existing default layout uses `src/pages/ProjectDetail.css`.

To customize a project:

1. Create a folder under `src/pages/projects/` with a JSX component and scoped CSS.
2. Export a default component accepting `{ project }`. Return a single `<main>` and
   include a React Router `Link` to `/#projects`. App already supplies the navbar and footer.
3. Register its existing slug in `src/pages/projects/customProjectPages.js` with
   `lazy(() => import("./YourProject/YourProject"))`.

The FSAE dashboard is registered as a working starter. It currently renders the
default template, so its appearance is unchanged. Replace that return value with
its custom layout when ready; comments mark future 3D and interactive features.
Projects without a registry entry continue using the default template. Remove an
entry to revert a custom page without changing its URL or homepage card.

Custom pages load on demand. Import heavy interactive features from their own page,
and defer loading large model assets until needed. No 3D dependencies are installed.
Provide static fallbacks and keyboard-accessible alternatives for interactive media.

Scope CSS under a unique page class. Project sections grow naturally instead of
inheriting the homepage's fixed viewport height and clipped overflow. For deliberately
full-height scenes, use the space below the navbar. Orbitron text should always be
uppercase; use `var(--font-title)` with `text-transform: uppercase`.

Run `npm run dev` to preview, `npm run build` for a production build, and
`npm run lint` for lint checks.
