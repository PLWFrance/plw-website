# Perfect Little Wedding — website prototype

An unpublished, static Astro + TypeScript starting point for an intimate wedding business in France. This is a design prototype, not the finished website. No content has been copied from the existing website; no live website integration, database, forms, analytics or tracking is included.

## Run locally

Use Node.js 24 LTS (or Node >=22.23.4) and npm >=9.6.5.

```sh
npm ci
npm run dev
```

Open the local address printed by Astro (normally http://localhost:4321).

```sh
npm run check    # Astro and TypeScript validation
npm run build    # Generate the static site in dist/
npm run preview  # Serve the production build locally
```

Astro was initialised against the registry's current stable release. Exact dependency versions are recorded in package-lock.json. No client framework is required, and the prototype ships without client JavaScript.

## Structure

- `astro.config.mjs`: static output and consistent trailing slashes.
- `src/pages/index.astro`: homepage prototype with approach, sample venue and next-chapter sections.
- `src/pages/venues/[id].astro`: builds a page for each venue collection entry.
- `src/layouts/BaseLayout.astro`: document metadata, shared navigation and footer.
- `src/layouts/VenueLayout.astro`: reusable venue page presentation.
- `src/components/PlaceholderImage.astro`: image dimensions, alt text and visible placeholder labels.
- `src/content.config.ts`: typed, validated venue content schema.
- `src/content/venues/*.md`: venue records and editorial body content.
- `src/styles/global.css`: responsive styles, keyboard focus and reduced-motion support.
- `public/images/`: local placeholder SVG artwork, not photographs of real places.

The sample route is `/venues/maison-des-oliviers/`. Its name, setting and descriptive content are fictional. It cannot be booked and makes no claim about a real venue. There are no testimonials, prices or customer claims.

## Adding venues and a future CMS

Add a Markdown file under `src/content/venues/` using the existing record as a field reference. The filename determines the URL. Required fields are `name`, `region`, `summary`, `fictional`, `image`, `imageAlt`, `setting` and `atmosphere`. Markdown below the frontmatter becomes the page body. Images currently use local paths under `public/`.

The content collection separates data from presentation. A future CMS can edit these Markdown records through Git, or replace the collection loader with a build-time CMS loader while preserving the schema and layouts. No CMS vendor, credentials or database has been added. Confirm URL stability and image handling during integration. The placeholder component and sample-specific booking text must be adapted when verified real content is introduced.

## Future Cloudflare Pages deployment

This repository is prepared for static hosting; **nothing has been deployed or connected to Cloudflare**. When deployment is separately authorised, use the repository root as the project root, `npm run build` as the build command and `dist` as the output directory. Select Node.js 24 LTS in the build environment. Static Astro output does not require a Cloudflare adapter, Worker or database. Do not configure automatic deployments while reviewing this prototype.

All pages currently include `noindex, nofollow` for prototype review. Before any public launch, replace placeholder artwork with approved licensed photography, replace fictional content with verified venue facts, approve service copy, confirm accessibility and responsive layouts in target browsers, add final metadata and decide when to remove the indexing restriction. `noindex` is not access control.
