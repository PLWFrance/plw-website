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
- `src/content.config.ts`: venue collection and stable source IDs.
- `src/lib/venue-schema.ts`: validated venue fields; `src/lib/venues.ts`: shared publication/slug rules.
- `.pages.yml`: Pages CMS fields and upload directory.
- `scripts/`: content validation and build integration tests.
- `docs/venue-management.md`: Sarah's editor guide and operational limitations.
- `src/content/venues/*.md`: venue records and editorial body content.
- `src/styles/global.css`: responsive styles, keyboard focus and reduced-motion support.
- `public/images/`: local placeholder SVG artwork, not photographs of real places.

The sample route is `/venues/maison-des-oliviers/`. Its name, setting and descriptive content are fictional. It cannot be booked and makes no claim about a real venue. There are no testimonials, prices or customer claims.

## Venue management with Pages CMS

Sarah can manage venues using the hosted Pages CMS interface and GitHub. Follow [Sarah's venue management guide](docs/venue-management.md) for account setup, adding/editing venues, image handling and the review workflow. Root `.pages.yml` configures this repository; its GitHub App installation and authenticated hosted save/upload round trip still require owner setup and acceptance testing. No CMS application, database, deployment or paid media service is added to this website.

The existing Markdown collection remains in `src/content/venues/`. `src/lib/venue-schema.ts` validates both original and new structured fields; `src/lib/venues.ts` provides shared slug checks, draft filtering and featured-first ordering. The Markdown body is the full rich-text description. Frontmatter stores location, media, facilities/amenities, capacity/accommodation, ceremony details, key/additional information, offers and SEO. `VenueLayout.astro` renders populated fields and hides empty sections. Videos are external links rather than embedded players.

`published: false` (including an omitted status) excludes a record from generated pages and homepage listings. `published: true` only makes it eligible for builds; it does not deploy. The fictional sample is explicitly eligible so the prototype remains reviewable. Draft content and uploaded assets are **not private** in this public repository. New CMS records require a unique lowercase hyphenated slug; legacy records without a slug fall back to their filename. Duplicate slugs fail validation, even across drafts. Slug changes do not create redirects.

```sh
npm run validate:content  # Validate YAML, CMS/Astro field agreement, records, local media and slugs
npm run check            # Astro/TypeScript diagnostics
npm test                 # Schema tests and temporary CMS-record build/publish/unpublish tests
npm run build            # Runs content validation, then builds the static website
```

The tests create distinctly named fictional fixture files temporarily and clean them up in a `finally` block, then rebuild the original content. Do not run `npm test` concurrently with another build or content-editing session. Validation uses the small `yaml` development dependency and Node's built-in test runner. Install development dependencies in build environments as well (`npm ci --include=dev`). No new browser runtime dependency is added.

These checks do not verify the authenticated hosted CMS UI or replace visual browser/accessibility review. CMS saves write commits to the selected branch, not PRs or production deployments. See the guide for limitations around draft privacy, image management, publishing and first-use acceptance checks.

## Future Cloudflare Pages deployment

This repository is prepared for static hosting; **nothing has been deployed or connected to Cloudflare**. When deployment is separately authorised, use the repository root as the project root, `npm run build` as the build command and `dist` as the output directory. Select Node.js 24 LTS in the build environment. Static Astro output does not require a Cloudflare adapter, Worker or database. Do not configure automatic deployments while reviewing this prototype.

All pages currently include `noindex, nofollow` for prototype review. Before any public launch, replace placeholder artwork with approved licensed photography, replace fictional content with verified venue facts, approve service copy, confirm accessibility and responsive layouts in target browsers, add final metadata and decide when to remove the indexing restriction. `noindex` is not access control.
