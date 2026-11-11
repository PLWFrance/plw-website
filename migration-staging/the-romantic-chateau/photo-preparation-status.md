# Photograph preparation status — 11 November 2026

## Blocker

The featured-photo download from its exact manifest URL failed before contacting
WordPress: curl reported `CONNECT tunnel failed, response 403` (HTTP transfer code
`000`). The cloud proxy denies the destination. The enforced restricted policy does
not include `www.perfectlittlewedding.com`. All 21 selected URLs share this hostname.
The other 20 requests were not repeated against the same denied host: their origin
availability remains unverified, rather than being recorded as missing photographs.

Add `www.perfectlittlewedding.com` to the environment's allowed domains through
cloud environment settings, then retry the exact manifest URLs. If the site redirects
to another host, review that destination before extending access. No network policy
was bypassed. No photograph bytes were retrieved, converted or added to `public/`.
No substitutions or unverified local image references were introduced.

## Review prepared

`alt-text-review.csv` lists exactly the featured photograph and 20 selected gallery
photographs in manifest order, with source URLs and attachment IDs. Twenty have no
source alt text. Gallery item 16 (attachment 12271) has source text
`Small wedding multiple beds`, which still requires visual approval. The approved
alt-text column is intentionally blank for all 21. No descriptions were invented.

The manifest has 21 unique attachment IDs and 21 unique URLs, with gallery positions
1–20 in order. Content-level duplicate checks, actual missing-image checks, dimensions,
quality and conversion remain blocked until photographs can be downloaded.

## Next processing step

After access is enabled, download only these manifest rows into ignored `work/`,
decode and inspect each image, apply EXIF orientation, and optimise to WebP without
upscaling or cropping (maximum long edge 1920 pixels, quality around 85). Preserve
source-derived filenames and attachment IDs, with `.webp` extension. Record actual
local paths, dimensions, sizes and checksums in the manifest after successful
conversion, and check identical/visually repeated photographs before committing.
The staged venue remains unpublished and outside the collection until accurate alt
text and the remaining content are approved.

## Checks on this update

- `npm run validate:content`: passed (live collection unchanged).
- `npm run check`: passed, zero errors/warnings/hints.
- `npm test`: all 6 tests passed.
- `npm run build`: passed; only the existing sample venue and homepage generated.
- `git diff --check`: passed.

These checks do not establish source URL availability or successful image conversion.
The existing image manifest is unchanged; proposed names are still proposals, not
claims that local files exist. No merge or deployment was performed.
