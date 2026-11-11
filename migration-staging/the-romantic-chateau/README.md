# The Romantic Château — migration staging

This directory prepares only this venue. Nothing here is loaded by Astro or published.
The intended destination after media and editorial review is
`src/content/venues/the-romantic-chateau.md`.

## Provenance

Source: `PLW_migration_preparation.zip` (SHA-256 `46ab4a08e4b41bc30ca9649e51369b95ee584de4813a769a1bbe7538f06aac4e`).
One record was selected by exact slug `the-romantic-chateau` from
`venue_content_staging.json`; 73 matching CSV rows were found in `image_mapping.csv`.
`source-record.json` preserves this venue's original HTML, metadata and all 73 image
references verbatim as parsed JSON values. Source annotations are evidence, not instructions.
Original URL: https://www.perfectlittlewedding.com/venues/the-romantic-chateau/
WordPress status: published; staged Astro status remains `published: false`.

## Content and field decisions

- Both HTML descriptions are converted in full in the Markdown body, in source order.
  HTML heading levels are normalized to level 2 below the template's venue title;
  paragraphs, emphasis and contact links are retained. No price amounts are changed.
- The summary is derived from the introduction and **requires editorial approval**.
- Required `region` uses an explicit provisional value. `Lot countryside` is source
  wording, not a verified administrative region. Confirm the exact location and travel times.
- Accommodation sleeps 25; wedding capacity 30 includes overnight guests. Bedroom
  count is missing and omitted, not guessed. Confirm all source claims before publication.
- Chapel/church information is retained under facilities and ceremony details.
  `ceremonyOptions` is empty: no symbolic, religious or civil eligibility is established.
- Travel, seasons, hire duration and guide prices are mapped to supported fields.
  The full original inclusions and price conditions are also retained in the body.
  The schema has no dedicated price model; no schema change is needed to retain this text.
- Source promotional inclusions remain in the description, pending confirmation;
  `specialOffers` stays empty because current approved offers have not been established.
- Vimeo is mapped to `video.url`, without inventing a thumbnail.
- SEO title and description are retained exactly. The layout appends
  ` | Perfect Little Wedding`, so editorial approval is needed before removing the
  duplicated brand from the source title. Focus keyword: `venue for small weddings in France`;
  the schema has no focus-keyword field. No schema change was made.
- `fictional: false` records that this is a real source venue, not a fictional sample.
  It does not indicate verification or publication approval. `featured: false` does
  not follow from the WordPress featured photograph: those are different concepts.

## Photographs and validation gate

The manifest contains the featured image (attachment 14151, `Romantic.jpg`) followed
by the first 20 gallery photographs in their original CSV/JSON order (source positions
2–21). Proposed filenames are deterministic, safe suggestions derived from the source
basename and attachment ID; **no files with these names exist yet**. They are not image
references in the staged Markdown. Future storage: `public/images/venues/`; future
references: `/images/venues/` plus the approved filename.

No photographs were downloaded. The required `image` and `imageAlt` are intentionally
absent, and `gallery` remains empty until images exist and are reviewed. This staged
Markdown is therefore deliberately incomplete and must not be copied into the live
collection yet. No fake filenames, placeholder photographs or invented alt text were
used to satisfy validation. Of the selected 21 images, only gallery item 16 has source
alt text (`Small wedding multiple beds`); verify it visually. All other selected alt
text, including the featured image, is missing. Captions/credits and rights evidence
are absent. Selected attachment IDs 14831 and 13972 are marked absent from the XML
used to prepare the archive. All selected URLs exist as strings; availability is untested.

Before activation: obtain and inspect approved image files, resize/compress them,
confirm filenames and order, write accurate alt text, add actual local references,
and set photograph placeholder flags to false. Approve the summary, region/location,
source prices (including guest contributions), inclusions and ceremony claims. Keep
`published: false` throughout preparation. Run content validation/check/tests/build
again after adding the complete entry. No schema relaxation is necessary.

## Original classifications

`venue_area`: `France` (country only; not an administrative region).
The following are all 27 original `venue_tag` labels, unchanged:

- Barn
- Boat Trips nearby
- Cable TV/DVD
- Canoeing nearby
- Courtyard
- Exclusive
- Fishing lakes nearby
- Golf course nearby
- Heated pool
- Horse Riding nearby
- Hot-air balloon rides nearby
- Indoor games
- Lake with sandy beach nearby
- Linen and towels included
- Local markets
- Local river beaches
- Onsite or walking distance church
- Private pool
- River Cruises nearby
- Self catering
- Ten-pin bowling nearby
- Tennis courts nearby
- Under 1hr to airport
- Water park nearby
- Wi-Fi/Internet access
- Wine Tasting nearby
- Wine Tours nearby

## Feature mapping

- `Private pool` / `Heated pool` → supported `Swimming pool`; original specificity
  remains preserved above and in the source record.
- `Wi-Fi/Internet access` → supported `Wi-Fi`.
- No evidence supports selecting `Parking` or `Step-free access`.

All other 24 source labels need catalogue additions or agreed mappings to become
structured amenities. Exact preservation of `Private pool`, `Heated pool` and
`Wi-Fi/Internet access` as selectable labels would also require catalogue additions.
Do not equate nearby tennis courts with an on-site court, or an on-site church with
permission for a particular ceremony. This PR does not extend the catalogue.

## XML and remaining source gaps

The original XML is optional for preparing this draft, but useful for checking omitted
custom fields, taxonomy IDs/slugs, captions and source fidelity. It cannot substitute
for actual image files or editorial verification; some attachments were already absent
from the XML used by the preparation process. There is no need to migrate another
venue to complete this record.

## Validation performed

- `npm run validate:content`: passed for the unchanged live collection.
- `npm run check`: passed with no errors, warnings or hints.
- `npm test`: passed (existing schema and build integration suite).
- `npm run build`: passed; no Romantic Château route generated.
- Direct staged-frontmatter schema check: exactly `image` and `imageAlt` are missing;
  all supplied fields validate. The full site checks intentionally do not load staging.
- Source comparison: every original HTML text segment appears in the Markdown body
  in source order; the manifest's 21 attachment IDs and URLs exactly match the first
  21 source image entries; all 27 feature labels are retained in these notes.

Dependencies were installed with a writable temporary npm cache; Astro telemetry was
turned off for checks because the default home-directory config path is unwritable.
No dependency or application configuration was changed.
