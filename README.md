# Golden Age Interactive Studio Website

A responsive, single-page studio website built with semantic HTML, CSS, and vanilla JavaScript. It has no build step or external dependencies and is ready for GitHub Pages.

## Structure

- `index.html` — all page content and SEO metadata
- `css/styles.css` — responsive layout, visual design, image fallbacks, and animation
- `js/main.js` — mobile navigation, active section state, image fallback handling, reveal animations, and the current year
- `assets/images/` — site artwork, logo, and favicon

## Add or replace images

Copy final image files into `assets/images/` using these exact names:

- `hero.webp`
- `forest-adventure-cover.webp`
- `showcase-assets.webp`
- `showcase-interface.webp`
- `showcase-game.webp`
- `logo.webp`
- `favicon.png`

The built-in illustrated placeholders remain visible when an image is missing. Images use `object-fit: cover`, so landscape artwork with important content near the center works best. The logo uses `object-fit: contain`.

## Update store links

Open `index.html` and find the two comments beginning with `Replace #` in the Featured Asset section:

1. Replace the `href="#"` on the **Unity Asset Store** button with the final Asset Store URL.
2. Replace the `href="#"` on the **itch.io** button with the final itch.io URL.

The placeholder click message automatically stops appearing after each `href` is replaced with a real URL.

## Preview locally

You can open `index.html` directly in a browser. For a closer match to GitHub Pages, serve the repository with any static web server, for example VS Code Live Server or:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy with GitHub Pages

1. Push this repository to GitHub.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the publishing branch (usually `main`) and the `/ (root)` folder.
5. Save. GitHub will publish the site and show its URL when deployment completes.

Because all paths are relative and there is no build system, the site works from both a GitHub Pages project URL and a custom domain.
