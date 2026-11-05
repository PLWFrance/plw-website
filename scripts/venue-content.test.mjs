import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { stringify } from 'yaml';
import { venueSchema } from '../src/lib/venue-schema.ts';
import { publishedVenues, venueSlug } from '../src/lib/venues.ts';
import { featureCatalogue, featureCatalogueSchema } from '../src/lib/venue-features.ts';
import { root, readVenue, validateContent, validateCms } from './validate-content.mjs';

const sample = readVenue(resolve(root, 'src/content/venues/maison-des-oliviers.md')).raw;

test('CMS field model matches Astro and content is valid', () => {
  validateCms();
  assert.ok(validateContent().length > 0);
});
test('omitted status is a draft; original fields remain compatible', () => {
  const { name, region, summary, fictional, image, imageAlt, setting, atmosphere } = sample;
  const data = venueSchema.parse({ name, region, summary, fictional, image, imageAlt, setting, atmosphere });
  assert.equal(data.published, false);
  assert.deepEqual(data.gallery, []);
  assert.equal(venueSlug({ id: 'legacy-name', data }), 'legacy-name');
});
test('feature catalogue preserves legacy multiple selections and rejects unreviewed terms', () => {
  const legacy = ['Swimming pool', 'Parking', 'Wi-Fi', 'Step-free access'];
  assert.deepEqual(venueSchema.parse({ ...sample, amenities: legacy }).amenities, legacy);
  assert.deepEqual(venueSchema.parse({ ...sample, amenities: null }).amenities, []);
  assert.equal(venueSchema.safeParse({ ...sample, amenities: ['Unreviewed feature'] }).success, false);
  const feature = featureCatalogue.features[0];
  for (const features of [
    [...featureCatalogue.features, feature],
    [{ ...feature, category: 'Missing category' }],
    [{ ...feature, wordpress: { taxonomy: 'features', termId: 0, slug: 'pool' } }],
    [
      { ...feature, wordpress: { taxonomy: 'features', termId: 1, slug: 'pool' } },
      { ...feature, value: 'Another value', wordpress: { taxonomy: 'features', termId: 1, slug: 'pool' } },
    ],
  ]) assert.equal(featureCatalogueSchema.safeParse({ ...featureCatalogue, features }).success, false);
  // A reviewed catalogue extension needs no changes to the existing venue record shape.
  assert.equal(featureCatalogueSchema.safeParse({ ...featureCatalogue, features: [
    ...featureCatalogue.features,
    { value: 'Fictional import fixture', label: 'Fictional import fixture', category: 'Activities',
      wordpress: { taxonomy: 'test-only', termId: 123, slug: 'fictional-import-fixture' } },
  ] }).success, true);
});
test('drafts stay hidden even when featured; featured published venues sort first', () => {
  const entry = (id, published, featured) => ({ id, data: { name: id, published, featured } });
  const rows = [entry('a', true, false), entry('b', false, true), entry('c', true, true)];
  assert.deepEqual(publishedVenues(rows).map(row => row.id), ['c', 'a']);
  assert.equal(rows[0].id, 'a');
});
test('invalid/duplicate slugs, unsafe URLs, missing alt text and fractional capacities fail', () => {
  for (const change of [
    { slug: '../escape' }, { slug: 'Upper case' }, { image: '/images/../secret.jpg' },
    { imageAlt: '' }, { guestCapacity: 1.5 }, { guestCapacity: -1 },
    { externalGalleryUrl: 'javascript:alert(1)' }, { video: { url: 'http://example.invalid/video' } },
    { video: { url: 'https://example.invalid/video', thumbnail: sample.image } },
    { gallery: [{ image: sample.image, alt: '' }] },
  ]) assert.equal(venueSchema.safeParse({ ...sample, ...change }).success, false, JSON.stringify(change));
  const data = venueSchema.parse(sample);
  assert.throws(() => publishedVenues([{ id: 'one', data }, { id: 'two', data }]), /Duplicate/);
  assert.equal(venueSchema.parse({ ...sample, guestCapacity: null }).guestCapacity, undefined);
  assert.equal(venueSchema.parse({ ...sample, guestCapacity: 0 }).guestCapacity, 0);
});
test('builds render CMS-shaped records and exclude drafts, including after unpublishing', () => {
  const contentDir = resolve(root, 'src/content/venues');
  const fixturePath = resolve(contentDir, 'cms-test-source-file.md');
  const draftPath = resolve(contentDir, 'cms-test-draft.md');
  assert.ok(!existsSync(fixturePath) && !existsSync(draftPath), 'Refuse to overwrite existing content');
  const fixture = {
    ...sample, name: 'Fictional CMS validation fixture', slug: 'cms-test-public-url', published: true,
    fictional: true, imagePlaceholder: true, location: 'Imagined test location',
    gallery: [{ image: sample.image, alt: 'Placeholder gallery test', caption: 'Fictional gallery caption', placeholder: true }],
    video: { url: 'https://example.invalid/test-video', thumbnail: sample.image, thumbnailAlt: 'Placeholder video test', placeholder: true },
    externalGalleryUrl: 'https://example.invalid/test-gallery', facilities: ['Fictional test facility'],
    amenities: ['Parking'], guestCapacity: 0,
    accommodation: { sleeps: 0, bedrooms: 0, details: 'Fictional accommodation test' },
    ceremonyOptions: ['Symbolic ceremony'], ceremonyDetails: 'Fictional ceremony test',
    keyInformation: [{ label: 'Test heading', value: 'Fictional key information' }],
    additionalInformation: 'Fictional additional information',
    specialOffers: [{ title: 'Fictional offer — test only', description: 'No real offer or price.' }],
    seo: { title: 'Fictional SEO test title', description: 'Fictional SEO test description' },
  };
  const write = (path, data) => writeFileSync(path, `---\n${stringify(data)}---\n\n## Fictional rich-text heading\n\nA **formatted** test description.\n`);
  const build = () => {
    const result = spawnSync('npm', ['run', 'build'], { cwd: root, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stdout + result.stderr);
  };
  try {
    write(fixturePath, fixture);
    write(draftPath, { ...fixture, slug: 'cms-test-hidden-draft', name: 'Hidden draft validation fixture', published: false });
    build();
    const html = readFileSync(resolve(root, 'dist/venues/cms-test-public-url/index.html'), 'utf8');
    for (const expected of ['Fictional SEO test title', 'Fictional SEO test description', 'Fictional gallery caption', 'Fictional accommodation test', 'Fictional ceremony test', 'Fictional key information', 'Fictional additional information', 'Fictional offer', '<strong>formatted</strong>', 'https://example.invalid/test-video', 'https://example.invalid/test-gallery', 'Maximum wedding guests']) assert.ok(html.includes(expected), `Missing output: ${expected}`);
    assert.ok(!/<iframe|<script|<form/i.test(html));
    assert.ok(!existsSync(resolve(root, 'dist/venues/cms-test-source-file')));
    assert.ok(!existsSync(resolve(root, 'dist/venues/cms-test-hidden-draft')));
    const home = readFileSync(resolve(root, 'dist/index.html'), 'utf8');
    assert.ok(home.includes('/venues/cms-test-public-url/'));
    assert.ok(!home.includes('Hidden draft validation fixture'));
    write(fixturePath, { ...fixture, published: false });
    build();
    assert.ok(!existsSync(resolve(root, 'dist/venues/cms-test-public-url')));
    assert.ok(!readFileSync(resolve(root, 'dist/index.html'), 'utf8').includes('Fictional CMS validation fixture'));
  } finally {
    rmSync(fixturePath, { force: true }); rmSync(draftPath, { force: true });
    build(); // Leave a clean production build with only the real repository content.
  }
});
