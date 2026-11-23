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

## Development-only rendered preview

The approved preview is now implemented at:

`http://localhost:4321/preview/venues/the-romantic-chateau/`

Check out `migration/the-romantic-chateau`, install dependencies with `npm ci` if
needed, then run `npm run dev` from the repository root. Use the port Astro prints
if 4321 is occupied. No environment variables or additional CMS configuration are
required. The dev server should stay bound to loopback for local review. This is a
local development preview, not a hosted or authenticated preview service.

The route reuses `VenueLayout.astro`, the same Markdown renderer, media component
and global styling as the published venue detail page. It adds a visible draft
banner. `BaseLayout.astro` retains the prototype's `noindex, nofollow` robots meta
on both normal and preview pages. No public navigation link was added.

`getStaticPaths()` returns paths only with `import.meta.env.DEV`. It retrieves only
the exact source ID `the-romantic-chateau` and verifies the exact slug; it never
lists the collection or accepts an arbitrary requested venue. The rendering code
also returns 404 outside development as defence in depth. Production builds,
including branch builds and `astro preview`, have no preview page. No environment
flag can enable it in a production build. Access-controlled hosted previews remain
out of scope; do not expose the development server as a public preview service.

The ordinary public route `/venues/the-romantic-chateau/` remains excluded by the
unchanged `publishedVenues` filter, and the homepage has no draft link. The venue
remains `published: false`, `fictional: false`. Pages CMS can edit the draft on this
branch; no automatic CMS preview button was added. Open the development URL
separately to inspect edits. No publication status needs changing.

## Verification

- Content validator and Astro checks pass; the record is a real unpublished draft.
- Development HTTP checks: the approved preview returns 200, with draft banner,
  complete Markdown description, 20 image elements with alt text and
  `noindex, nofollow`. The sample venue and an unknown slug return 404 under the
  preview route. The unpublished public venue route still returns 404.
- Production-build integration tests assert the approved preview HTML is absent,
  the public draft HTML is absent and no preview link appears on the homepage.
  The existing test fixture also verifies other drafts remain unpublished.
- An additional real draft fixture was checked against the development preview:
  it returns 404 even though it is present in the collection.
- Normal production output is served separately to verify the preview URL returns
  404 while the homepage returns 200.

No publication filtering, CMS configuration, content status or indexing protection
was changed. No merge or deployment was performed.
