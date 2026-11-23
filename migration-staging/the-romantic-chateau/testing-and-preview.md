# Draft testing and preview — The Romantic Château

## Content and photographs

The record has moved to `src/content/venues/the-romantic-chateau.md`.
`published: false`, `fictional: false`, `featured: false`. Source description body,
prices, summary, provisional location/region and SEO are unchanged. Main image and
all 19 gallery items use actual local WebP paths in the current manifest's order.
All image placeholder flags are false. The omitted duplicate remains omitted.

All 20 photographs were visually inspected using labelled review sheets. Alt text
now describes visible content only. It does not assign an architectural period,
room capacity, accessibility, heating, building function or legal ceremony status.
For example, tower exteriors and the room with rows of chairs are described without
claiming church/chapel status. These generic descriptions are intentional; specific
building identity/function would need editorial confirmation. Gallery item 13 is a
two-part photograph and its alt text reflects both panels. Attachment 12271 visibly
shows three beds; the old vague source alt text has been replaced without inferring
bed sizes or accommodation capacity. `alt-text-review.csv` preserves the prepared
wording and editorial flags. Human approval, image rights/credits, region/location,
summary, prices/inclusions and ceremony claims remain pending.

## Lower-resolution photographs retained

| Current gallery position | Original gallery position | Attachment ID | Dimensions | Visible content |
| --- | --- | --- | --- | --- |
| 16 | 17 | 12272 | 1024 × 501 | Bathroom |
| 17 | 18 | 12273 | 1024 × 568 | Sitting room |

Both files are unchanged in dimensions and remain in their correct order.

## Pages CMS editing

The repository's `.pages.yml` collection reads `src/content/venues/*.md` as YAML
frontmatter plus Markdown body. It has no publication filter in the collection
view. Therefore this draft is available for listing/editing when the hosted editor
selects repository `PLWFrance/plw-website`, branch `migration/the-romantic-chateau`,
and **Wedding venues → The Romantic Château**. Name/slug are unchanged and required
image and alt fields are now populated. Keep **Include on website** off.

Pages CMS saves to the selected Git branch, not to a separate database. Selecting
`main` will not expose the new record until changes are separately merged. No hosted
CMS login, save or upload round trip was performed in this task; configuration and
content validation establish compatibility, not authenticated hosted UI acceptance.
There is no configured CMS button or integration for rendering an unpublished draft.
Draft source and public assets are not confidential.

## Rendered preview limitation and proposed change

`src/pages/venues/[id].astro` passes collection entries through `publishedVenues`,
which excludes `published: false` entries. The homepage uses the same filter.
Consequently **no rendered preview route is currently available**, in either
`astro dev` or the production build. `/venues/the-romantic-chateau/` is the eventual
public route after approval, but currently must return 404. `astro preview` only
serves the built files and cannot reveal this excluded entry. A public branch
preview deployment would also exclude it. No publication behaviour was changed.

Smallest proposed safe change (not implemented, awaiting approval): add a separate
`/preview/venues/[id]/` route that renders drafts only when `import.meta.env.DEV`
is true, with `getStaticPaths()` returning no routes during production builds.
Keep the existing published route and homepage filtering untouched; include a
visible draft banner, no indexing and no public navigation links. Proposed local
URL: `http://localhost:4321/preview/venues/the-romantic-chateau/` (use the actual
port printed by Astro). This URL is **a proposal, not a working route**.
Acceptance checks should prove that a local draft renders and production output
contains neither preview pages nor this unpublished public venue route. This would
provide local rendering only; shared/private CMS previews need a separately agreed
hosting and access workflow.

## Verification performed

- Content validator: 2 venue records valid, only the fictional sample eligible for builds.
- Astro checks: zero errors, warnings or hints.
- Existing test suite: all six tests passed.
- Static build: passed, no Romantic Château route or homepage link.
- Direct schema/order check: 20 correct local image paths, non-empty alt text,
  `published: false`, `fictional: false`; original Markdown body is byte-for-byte unchanged.
- Local Astro development server: `/venues/the-romantic-chateau/` returned 404;
  `/venues/maison-des-oliviers/` returned 200, confirming the server is working and
  draft filtering applies in development as well as the build.

The proposed preview change was not implemented. No publication or CMS configuration
was changed; no hosted CMS credentials were requested or used.
