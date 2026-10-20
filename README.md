# Golden Age Interactive Studio Website

A responsive portfolio for Golden Age Interactive Studio, built with semantic HTML, CSS, and vanilla JavaScript. It has no build step or external dependencies and is ready for GitHub Pages.

## Project structure

- `index.html` — page content, semantic structure, and SEO metadata
- `css/styles.css` — responsive layout, visual design, fallbacks, and animation
- `js/main.js` — link configuration, navigation, image fallbacks, reveal animation, and accessible gallery behavior
- `assets/images/` — logos, project artwork, screenshots, social preview, and favicon

## Image assets

Upload images to `assets/images/` with these exact filenames. Missing images are replaced by neutral placeholders, so the layout remains usable while artwork is being prepared.

| Filename | Recommended dimensions | Use |
| --- | ---: | --- |
| `small_logo.webp` | 512 × 512 px or larger, transparent | Header and footer mark |
| `big_logo.webp` | 1200 × 1200 px or larger, transparent | Contact section crest |
| `hero-studio.webp` | 1600 × 1200 px or wider | Hero background |
| `venture-grind-cover.webp` | 900 × 1200 px | Venture Grind cover |
| `venture-grind-01.webp` | 900 × 1600 px | Venture Grind screenshot |
| `venture-grind-02.webp` | 900 × 1600 px | Venture Grind screenshot |
| `medieval-strategy-cover.webp` | 1600 × 900 px | Medieval project cover |
| `medieval-strategy-01.webp` | 1600 × 900 px | Medieval project screenshot |
| `medieval-strategy-02.webp` | 1600 × 900 px | Medieval project screenshot |
| `forest-essentials-cover.webp` | 1600 × 1000 px | Essentials asset cover |
| `forest-complete-cover.webp` | 1600 × 1000 px | Complete asset cover |
| `web-development-01.webp` | 1600 × 1200 px | Web service supporting image |
| `showcase-assets.webp` | 1400 × 1200 px | Large Forest Adventure showcase image |
| `showcase-interface.webp` | 1200 × 800 px | Forest Adventure interface preview |
| `showcase-game.webp` | 1200 × 800 px | Forest Adventure in-game preview |
| `og-preview.webp` | 1200 × 630 px | Open Graph/social preview |
| `favicon.png` | 64 × 64 px | Browser icon |

Keep important content away from the extreme edges. Project screenshots preserve their natural orientation in the gallery; cover images use a fixed presentation crop. Logos use `object-fit: contain` and retain transparency.

## Configure external links

Open `js/main.js` and update the `SITE_LINKS` object near the top:

```js
const SITE_LINKS = Object.freeze({
  VENTURE_GRIND_GOOGLE_PLAY_URL: "",
  FOREST_ESSENTIALS_UNITY_URL: "",
  FOREST_COMPLETE_UNITY_URL: "",
  MEDIEVAL_STRATEGY_URL: ""
});
```

Use complete `https://` URLs. Empty or invalid values leave the corresponding control disabled; the site never links visitors to a placeholder URL.

## Preview locally

Opening `index.html` directly works for a quick check. For behavior closer to GitHub Pages, run a static server from the repository root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Commit and push the repository to GitHub.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the publishing branch (usually `main`) and the `/ (root)` folder.
5. Save and wait for GitHub Pages to provide the deployment URL.

All internal paths are relative, so the site works at a GitHub Pages project URL or a custom domain.
