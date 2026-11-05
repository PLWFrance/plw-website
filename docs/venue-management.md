# Sarah's guide to managing venues

The venue editor is **Pages CMS**, available at [app.pagescms.org](https://app.pagescms.org/). It provides fields and image uploads instead of a code editor. The venue files and images remain in the PLW GitHub repository; the website has no database or CMS server to run.

## One-time access setup

The repository configuration is ready in `.pages.yml`. The team has successfully tested creating, saving and reopening venues, selecting existing gallery photographs and retaining a newly uploaded photograph on `cms-testing-from-main`. This editor revision still needs a hosted smoke test on its own review branch. For a new account:

1. Sign in to Pages CMS with the GitHub account that should manage PLW content.
2. If prompted, install/authorise the Pages CMS GitHub App on the account that owns `PLWFrance/plw-website`. Select **only this repository**. The repository owner may need to approve access. Sarah needs appropriate write access; passwords or tokens should never be added to the website source.
3. Open `PLWFrance/plw-website` and choose the content branch. For this PR's review, use `feature/venue-editor-improvements`. The configuration is read from the selected branch, so it will not appear on `main` until this PR is reviewed and merged by a person.
4. Open **Wedding venues**. You should see the fictional Maison des Oliviers sample.
5. Read the draft and publishing section below before saving anything. For ongoing editing, agree a review branch with the developer and select that branch each session. Pages CMS saves commits to the selected branch; this configuration does not create a pull request or enforce approval for each save.

This setup uses the hosted CMS. It does not install or self-host the Pages CMS application, provision a database, connect Cloudflare or change WordPress. The hosted service has its own infrastructure and terms. No paid image service or new subscription is configured here; GitHub and Cloudflare plan limits still apply.

## Create a venue

1. Check the repository and branch shown in the editor. Choose the new-entry action in **Wedding venues** (button wording may vary with the hosted app version).
2. Enter the **Venue name** and a unique **URL slug**. For example, a fictional test entry could use `fictional-review-venue`. Use lowercase letters, numbers and hyphens, without spaces or slashes. The address will be `/venues/fictional-review-venue/`. Do not reuse another venue's slug.
3. Leave **Include on website** off while preparing the venue. The developer-managed fictional-content flag stays hidden and defaults to on. Ask the developer to verify real content before changing it; do not migrate real venues yet. Drafts still need a name, region, short description, main image and alt text to pass validation.
4. Add the **Short description** for the card and introduction, and use the **Full venue description** editor for paragraphs, headings and lists. The rich-text editor stores Markdown; you do not need to edit Markdown yourself. Use headings below the page title. Add photographs through the image fields rather than pasting HTML or embeds.
5. Enter the **Region**, **Location**, **Setting** and **Atmosphere**. Unknown facts can remain blank except for the required region. For a fictional entry, explicitly describe the location as imagined.
6. Choose the **Main photograph** and describe it in **alt text**, such as the visible room, garden or courtyard. Keep **Main image is a placeholder** on when using the supplied illustration. Turn it off only for an approved photograph.
7. Add gallery items one at a time. Each contains an image, required alt text, optional caption/credit and its own placeholder toggle. Use the list controls to reorder or remove items. The order is the order shown on the venue page.
8. Add optional details from the field guide below. Leave unknown numbers blank rather than guessing. Select venue features and ceremony options only when confirmed.
9. Save using the editor's save action. This writes a Git commit to the selected branch. Saving to `main` can trigger the connected Cloudflare deployment, so use the agreed review branch. Ask the developer to run validation/build and review the branch before it is merged.

For a safe first test, use the existing `courtyard-placeholder.svg` image available in the media library. It is labelled as a placeholder and does not show a real venue. Do not copy a real venue's claims into the fictional sample.

## Field guide

| Fields | What to enter |
| --- | --- |
| Featured venue | Places an eligible venue before non-featured venues on the homepage. Ties sort by venue name. It does not override draft status. |
| Main image and gallery | Approved local images, alt descriptions, captions/credits where needed, and accurate placeholder toggles. |
| Video URL and thumbnail | An optional full `https://` URL. An uploaded thumbnail also requires alt text and a video URL. The page shows a link, not a player or automatic playback. The thumbnail placeholder toggle is separate. |
| External gallery URL | Optional full `https://` link. It opens the external site only when clicked. |
| Other facility details | A repeatable list for confirmed details that need explanation. Existing facilities remain intact. |
| Venue features | Search by name or category and select multiple confirmed choices. Only the four existing choices are seeded; the full WordPress list awaits export and review. Request missing reusable choices from the developer. Unselected means unknown. Explain access arrangements under key information. |
| Maximum wedding guests | A verified, non-negative whole number. Blank = unknown and hidden. `0` means none and is displayed as zero. |
| Accommodation | Optional overnight guest and bedroom counts, plus plain-text details. Leave unknown counts blank. |
| Ceremony options and details | Confirmed symbolic, religious or civil options and any conditions. Legal eligibility for a civil ceremony needs separate confirmation; selecting the field does not establish it. |
| Key information | Repeatable heading/details pairs, such as verified access arrangements or wet-weather plans. |
| Additional information | Plain text with line breaks preserved. |
| Special offers | Repeatable title/details items. Include approved terms. No prices or real offers have been invented. Remove expired offers manually; there is no automatic expiry. |
| SEO title and description | Optional. Blank values use the venue name and short description. The site appends the PLW name to titles. Prototype pages still have `noindex, nofollow`. |
| URL slug | The public page address, separate from the venue's display name. Choose carefully; no automatic redirect is created if it changes. |

## Edit, hide or remove a venue

Open **Wedding venues**, search by name/region/location and choose a record. Make changes and save. Existing slugs continue working if you only change the venue's display name. Changing a slug changes links on the next build; ask the developer for a redirect before changing an address people already use. New filenames use the slug; changing an existing slug does not necessarily rename its source file, which is fine because the website uses the stored slug.

To hide a venue, switch **Include on website** off and save. It is excluded from the next successful website build, including homepage listings. Existing deployed copies remain visible until a new build is separately deployed. To permanently delete a record, use the editor's delete action after review; hiding it first is usually easier to reverse. Git history retains previous versions. Deleting a record does not automatically delete its images.

## Drafts, saving and publishing

- **Draft:** the `Include on website` toggle is off (the default for new records and records missing a status). Draft records are saved in GitHub but have no generated venue page or homepage listing. This is a custom Astro filter, not a native Pages CMS editorial approval system or private draft preview.
- **Saved:** Pages CMS commits files to whichever branch you selected. Saving does not open a PR, approve content or validate the full Astro schema. A save to a Cloudflare-connected branch can trigger a deployment. There is no scheduled publishing configured.
- **Eligible for a build:** turning the toggle on includes the venue in the next build. The developer should check the branch, run validation/build and open a PR. A person must approve and merge; nothing here auto-merges.
- **Live:** the built version has been deployed to Cloudflare. The existing Cloudflare prototype uses `main`. This change adds no deployment workflow and changes no hosting settings. Treat saves to `main` as potentially live; use a review branch.

**Draft does not mean confidential.** This repository is public: saved draft files and uploaded images can be viewed in GitHub even though they are omitted from website pages. Do not upload private, embargoed or personal information expecting the draft toggle to protect it. `noindex` is not access control either.

## Images and media limitations

Uploaded files go into `public/images/venues/`, and content receives a public path beginning `/images/venues/`. The original prototype illustration remains available under `public/images/` for the homepage. Supported upload extensions are JPG/JPEG, PNG, WebP, AVIF and SVG; photographs are normally best uploaded as compressed WebP or JPEG. Use SVG only for trusted illustrations such as the supplied placeholder.

Use short, unique filenames with lowercase letters, numbers and hyphens. The media configuration requests safe filename renaming. Prepare the image's crop, dimensions and compression before upload; this implementation serves public files as-is and does not add automatic image optimisation, responsive image variants, a paid media CDN or an asset-management service. Large originals increase page weight and Git repository history. A practical editorial target is under about 500 KB per photograph; this is guidance, not an enforced limit. CMS/GitHub upload limits still apply.

A media upload or delete may create a commit independently of saving a venue. Removing an image from a gallery only removes that reference; it does not remove the uploaded file. Renaming/deleting a shared image can break other records. The build validator catches missing main/gallery/thumbnail files, but it does not manage references automatically or inspect external websites. Check usage before deleting media. Files in `public/` are copied to build output even when only a draft references them, so draft image exclusion is not a privacy feature.

## Checks before accepting this CMS setup

The repository tests validate the config's YAML, supported field definitions, CMS/Astro field agreement, media paths, content schema, draft filtering, duplicate slugs and real builds from temporary CMS-shaped examples. The configuration was also checked against the upstream Pages CMS 2.1.8 config schema at commit [`6f4e860`](https://github.com/hunvreus/pagescms/blob/6f4e860a35d934406580287e7042e5e111e207a1/lib/config-schema.ts). These checks do **not** prove hosted account access, editor rendering or a save/upload round trip.

Sarah and the developer should check the following on a review branch before calling the interface fully verified:

1. Open the repository/branch and confirm the numbered field order and collapsed list items appear, with the existing sample and Markdown body intact.
2. Create a clearly fictional draft, save it, reopen it and confirm the values persisted without losing the description.
3. Upload a small placeholder image, add/reorder two gallery items, add alt text and save/reopen. Confirm repository image paths start with `/images/venues/`.
4. Ask the developer to run `npm run check`, `npm test` and `npm run build`; confirm the draft has no generated page or listing.
5. Toggle the test entry on, save and rebuild locally. Check its URL slug, SEO metadata, image order and optional fields. Toggle it off and rebuild to confirm removal. Delete the test record/media only after checking references.
6. Review the rendered page on desktop/mobile and with keyboard navigation. Review the Git diff, then open a content PR for approval. Do not deploy as part of this test.

If a save succeeds but a build fails, the content is saved in GitHub but is not ready for a website build. Common causes are a duplicate slug, fractional capacity, an image missing from the repository or a thumbnail without alt text. Ask the developer to read the validation message and fix the record. Do not delete `.pages.yml` or bypass the build validator.

Official references: [quick start](https://pagescms.org/docs/quick-start/), [configuration](https://pagescms.org/docs/configuration/), [media paths](https://pagescms.org/docs/configuration/media/), [field types](https://pagescms.org/docs/configuration/content/fields/), [filenames](https://pagescms.org/docs/configuration/content/filename/), [settings](https://pagescms.org/docs/configuration/settings/).


## Finding fields quickly

Fields follow seven numbered sections: basic venue information; descriptions/location; photographs/galleries; facilities/accommodation; ceremonies; key information/offers; SEO/publishing. The number appears on the first field in each section. Pages CMS does not provide layout-only collapsible sections for these flat records. Gallery items, key-information pairs and offers start collapsed; expand only the item you need. SEO remains optional near the bottom. Required fields explicitly say “required”; gallery descriptions and headings/details inside added items are also required.

The fictional-content safety flag and configuration editor are hidden to reduce technical controls. Photo placeholder switches stay available because Sarah needs to distinguish illustrations from approved photographs. Hiding is a convenience, not a permission boundary. Existing flag values are retained; new content remains safely fictional by default.

## Save → preview → approval → publish

Today, save to the agreed review branch with **Include on website** off. Ask the developer for a rendered preview. Drafts deliberately have no generated page, so an ordinary branch build cannot preview them. The developer can prepare a temporary local copy, enable only the venue under review in that copy, run validation/build and `npm run preview`, and show Sarah the rendered page. Never commit that temporary status change or upload/deploy the draft build. `astro preview` is a local server, not a shareable hosted preview service.

For the lowest-administration ongoing workflow, use a dedicated content review branch (agreed and created separately, never repurpose `cms-testing-from-main`). Enable approved content there, open a GitHub PR to `main`, review the diff and build checks, and have an authorised person merge only after approval. The existing Cloudflare connection then handles publication according to its production configuration. **Do not merge or deploy as part of this development task.** Approval is a team process until branch protection is separately configured.

Cloudflare Pages supports branch preview deployments and GitHub deployment links, subject to project branch controls and account limits. The developer must first inspect the project's preview settings, confirm which branches build, and decide access restrictions before enabling shared previews. A branch preview is a deployed website; drafts remain filtered there and public assets are still copied. No Cloudflare configuration was inspected or changed in this task. Direct draft preview from the CMS, private draft rendering, approval buttons and automatic PR creation are not implemented. See [the developer review](venue-editor-review.md) for the exact limits and setup steps.
