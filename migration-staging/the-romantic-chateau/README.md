# The Romantic Château — migration staging

This directory retains migration evidence and editorial review notes. The venue record
now lives at `src/content/venues/the-romantic-chateau.md`, with `published: false`
and `fictional: false`. It is editable as a draft in Pages CMS on this branch.
See `testing-and-preview.md` for current testing and preview limitations.

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

Photograph preparation is now recorded in [photo-preparation-status.md](photo-preparation-status.md).
The supplied cleaned ZIP contains the featured image and 19 unique gallery images;
original attachment 13972 was omitted as a reported duplicate. The current manifest
contains actual WebP paths and original positions. The earlier 21-image selection is
preserved in `original-image-selection.csv` and all 73 original references remain in
`source-record.json`. The 20 supplied images are optimised under `public/images/venues/`.

Alt text has now been prepared from visual inspection and connected to the venue record;
`alt-text-review.csv` retains source wording, prepared wording and editorial review flags.
Editorial approval and image rights remain outstanding. The summary, region/location,
source prices/inclusions and ceremony claims still need approval. The complete venue
now validates in the live collection but remains unpublished. No schema changes were made.

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

Content validation now covers both the fictional sample and the complete unpublished
Romantic Château record; only the sample is eligible for generated pages. Astro checks,
all six existing tests and build pass. Image paths, order, real/draft flags and unchanged
Markdown body were separately checked. Development and build both exclude the draft.
See `testing-and-preview.md` for results and the proposed local-only preview route.
The original 21-image selection and all 27 feature labels remain preserved as evidence;
the current image manifest contains the cleaned 20-photo selection.
