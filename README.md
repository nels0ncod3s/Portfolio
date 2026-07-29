# Nelson Wey — Portfolio

Personal site for Nelson Wey, software engineer in Lagos, Nigeria. Single-page SvelteKit
app: hero, selected work, stack, about, contact.

## Stack

- **SvelteKit 2** with Svelte 5 in runes mode (`vite.config.js` forces `runes: true`)
- **Vite 8**, `adapter-auto`
- No CSS framework and no animation library — the design system lives in `src/app.css`
  and everything moves with CSS transitions plus three small actions

## Develop

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run preview` serves the production build. `npm run format` / `npm run lint` run Prettier.

## Structure

```
src/
  app.css                 design tokens, type scale, buttons, grain, cursor, intro
  app.html                pre-paint theme resolution (avoids a flash of dark)
  lib/
    actions/              reveal (scroll-in), magnetic (cursor pull), spotlight (pointer light)
    components/           Nav, Hero, Work, Stack, About, Footer, Cursor, Grain, Intro
    data/                 site.js, projects.js, stack.js — all copy lives here
    state/clock.svelte.js shared Lagos time ticker (one interval, many subscribers)
static/
  favicon.svg, robots.txt
```

## Editing content

Everything user-facing is data, not markup:

- **Projects** — `src/lib/data/projects.js`. Set `active: true` to show a project in the
  hero's "currently building" panel and give it a `live` flag in the work list.
- **Stack** — `src/lib/data/stack.js`. `marquee` feeds the scrolling ticker, `groups`
  feeds the categorised list.
- **Name, email, socials, nav** — `src/lib/data/site.js`.

### Adding a résumé

The nav's Résumé link is off by default so the site never ships a dead link. To turn it on,
drop the file at `static/resume.pdf` and set `resume: '/resume.pdf'` in `src/lib/data/site.js`.

## Theme

Dark by default, light available. The theme is resolved by an inline script in `app.html`
_before_ first paint and written to `<html data-theme>`, so returning light-mode visitors
never see a dark flash. `Nav.svelte` only mirrors that value into component state.

## Motion

Every animation is gated behind `prefers-reduced-motion`. When it's set, the intro curtain,
grain layer and custom cursor are removed entirely and all transitions collapse to ~0ms.
The intro curtain is deliberately CSS-only so it clears even if JavaScript never loads.
