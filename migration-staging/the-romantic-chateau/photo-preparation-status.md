# Photograph preparation status — 23 November 2026

## Supplied photographs prepared

The user supplied `romantic-chateau-ready-for-codex.zip` (SHA-256
`0cf7fb17093599d7563f2bebcd86bd550f1e4fd167fe93000afdc3749781686b`).
It contains 20 photographs: 1 featured + 19 gallery, not 21. Its README reports that
original gallery item 14, attachment 13972, was a byte-identical duplicate of the
featured attachment 14151 and was removed. Attachment 13972 is not supplied, so
that specific duplicate claim cannot be independently verified here. No replacement
was introduced. The relative order of all remaining source photographs is preserved.

`original-image-selection.csv` preserves the earlier 21-row manifest.
`image-manifest.csv` now records the 20 supplied images, gallery positions 1–19,
original gallery/source positions, original URLs/IDs/filenames, actual local paths,
input/output dimensions, bytes and SHA-256 checksums. The cleaned manifest's URLs,
IDs and source filenames match the original selection. Each manifest image has one
successfully decoded local WebP under `public/images/venues/`.

The earlier WordPress proxy blocker is historical: this update uses uploaded files
and does not require WordPress access. Origin URLs were not rechecked and no other
gallery photographs were downloaded. Source URL availability remains unverified.

## Optimisation and inspection

Pillow 12.3.0 applied EXIF orientation, converted to RGB, resized proportionally to a
maximum long edge of 1920 pixels only when larger, and encoded WebP quality 75–85,
method 6 (per-file quality is recorded in the manifest; quality is lowered only when
needed to stay below the input size and 500 KB). No cropping or upscaling. EXIF metadata was not carried into outputs.
Original source files remain in the supplied ZIP, not in the public asset directory.

Input photos total 4,392,930 bytes; WebP outputs total 3,041,598 bytes (30.8% smaller).
All 20 outputs were reopened/decoded and dimensions verified. Original byte hashes
and decoded pixel hashes are unique across the 20 supplied photographs. A contact
sheet was visually inspected: no missing, unrelated substitution or obvious repeated
photograph was found. Different viewpoints of the same venue were retained.

Source photographs 12272 (1024×501) and 12273 (1024×568) have a short edge below
600 pixels. Their original resolution is preserved, not enlarged; review them at
full display size before launch. Portrait images retain their original orientation.
File names retain the venue identifier, attachment ID and source basename, rather
than introducing unverified scene labels.

## Alt text and publication

`alt-text-review.csv` lists all 20 images with local paths, original URLs and order.
Nineteen lack source alt text; current gallery item 15 (original gallery item 16,
attachment 12271) retains `Small wedding multiple beds` as unapproved source text.
That wording is not a reviewed descriptive alternative. Approved alt text remains
blank for every photograph; no new alt descriptions were written or attached.
Rights/credits also remain unverified.

The staged venue stays outside the live collection, with `published: false`, missing
required `image` and `imageAlt`, and no populated gallery. Photographs are recorded
in the manifest only until alt text and content are approved. The site schema has
not been relaxed. Files in public/ are copied by builds even without venue references;
this does not itself publish a venue page. No merge or deployment was performed.

## Validation

Content validation, Astro/TypeScript check (zero errors, warnings or hints), all six
existing tests, and the final static build passed. A separate asset check reopened
all 20 final WebPs, checked their dimensions/checksums and safe local paths, and
verified their built copies byte-for-byte. No Romantic Château route was generated.
These checks do not approve alt text, venue facts, image rights or origin URLs.
