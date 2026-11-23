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

## Local development preview

Check out `migration/the-romantic-chateau`, run `npm ci` if needed, then `npm run dev`.
The route is `/preview/venues/the-romantic-chateau/` on the port Astro prints.
No flag is required in development. A localhost address is local to the Cloud machine;
it is not a browser-accessible Codex proxy link. This environment previously exposed
no HTTP portal, so use the protected Cloudflare preview for remote review.

## Protected Cloudflare branch build

The owner confirmed Pages is connected to `PLWFrance/plw-website`, production branch
`main`, build command `npm run build`, output `dist`. The owner also confirmed that
Cloudflare Access protects `*.plw-website-1kh.pages.dev` with an email allow policy.
These are owner-confirmed settings, not account settings inspected by this task.

In Cloudflare Pages project settings, set `ENABLE_VENUE_PREVIEW=true` for the
**Preview environment only**. Leave this variable absent/false in Production.
Cloudflare supplies `CF_PAGES_BRANCH`; do not override it. The build gate requires
both exact string comparisons:

- `ENABLE_VENUE_PREVIEW === 'true'`
- `CF_PAGES_BRANCH === 'migration/the-romantic-chateau'`

Both `getStaticPaths()` and the rendering guard use the same helper. Ordinary builds,
`main` even with the flag set, and other branches with the flag set do not generate
this route. Only the exact source ID and slug `the-romantic-chateau` are allowed;
no other draft is enumerated. Local development remains allowed independently.
Do not force development mode for a Cloudflare build.

Cloudflare Access **must remain enabled before the flagged build is published**.
The flag/branch check is a build-output gate, not authentication. The generated
preview HTML and image assets are static; Access must protect all paths on both the
branch alias and immutable deployment-hash hostnames. Keep the unprefixed production
hostname and custom production domains out of this draft-preview workflow. If Access
is removed or bypassed, a previously generated preview can become public even if a
later build disables the flag. Retire older preview deployments when review ends.

The deployment must be classified as **Preview**, from the migration branch, never
promoted to production. Retain `main` as the production branch. If branch previews
are disabled, include `migration/the-romantic-chateau` in preview branch controls.
Pushing this branch may trigger Pages automatically; no manual deployment or merge
is part of this task. The venue remains `published: false`, `fictional: false`.

Open the actual successful Cloudflare Preview deployment URL, then append:

`/preview/venues/the-romantic-chateau/`

For the branch alias, the expected form is
`https://migration-the-romantic-chateau.plw-website-1kh.pages.dev/preview/venues/the-romantic-chateau/`.
Confirm the actual alias in Cloudflare before sharing; this task has not deployed
or verified that address. Owners need their email addresses added to the Access
allow policy before they can review; currently only the account owner's email was
reported as allowed. Verify a logged-out browser is challenged and an allowed login
can open the page and all photographs. The deployment-hash URL must also challenge.

## Layout and publication protection

The route reuses `VenueLayout.astro`, the normal Markdown renderer, image component
and styling. The banner reads `Draft preview · For review only · Not published ·
Content awaiting approval` so it fits local and protected hosted review.
`BaseLayout.astro` retains `noindex, nofollow` on the prototype and preview pages.
No navigation links are added. The regular public venue route and homepage keep
using the unchanged publication filter; the draft stays excluded from both.
Pages CMS can edit the record on the migration branch; no preview button is added.

Cloudflare Access protects the review website, not source/images already stored in
the public GitHub repository. The remaining editorial checks still apply.

## Validation matrix

The automated suite checks the exact string gate, development allowance, and actual
build output for missing flag on the correct branch, enabled flag on `main`, enabled
flag on another branch, and the explicitly enabled correct branch. An extra draft
fixture stays inaccessible even in the enabled build. Enabled HTML is checked for
the banner, robots metadata, venue body and all 20 correct image paths. The normal
public draft route and homepage remain unpublished in all configurations. A final
ordinary production build restores output without the preview page.

No Cloudflare settings were changed by this task and no manual deployment or merge
was performed. Authentication itself must be verified in Cloudflare after its build.

### Results for this change

Content validation passed (2 records, 1 eligible for public builds). Astro check
reported zero errors, warnings or hints. All 8 tests passed, including real builds
for disabled/mismatched/enabled configurations. Separate enabled-preview and
ordinary production builds both passed; the former contained the preview HTML and
the latter did not. Local development returned HTTP 200 with the draft banner,
venue body and robots protection. Publication flags were unchanged. The working
build output was left in normal production mode without the preview route.
