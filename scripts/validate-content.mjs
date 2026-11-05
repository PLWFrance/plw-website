import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';
import { venueSchema, amenities, ceremonyOptions } from '../src/lib/venue-schema.ts';
import { publishedVenues } from '../src/lib/venues.ts';
import { featureOptions } from '../src/lib/venue-features.ts';

export const root = fileURLToPath(new URL('../', import.meta.url));
function yaml(source) {
  const document = parseDocument(source, { uniqueKeys: true });
  assert.equal(document.errors.length, 0, document.errors.map(error => error.message).join('\n'));
  return document.toJS();
}
export function readVenue(path) {
  const source = readFileSync(path, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert.ok(match, `Missing YAML frontmatter: ${path}`);
  return { raw: yaml(match[1]), body: source.slice(match[0].length) };
}
export function validateCms() {
  const config = yaml(readFileSync(resolve(root, '.pages.yml'), 'utf8'));
  assert.equal(config.media.input, 'public/images/venues');
  assert.equal(config.media.output, '/images/venues');
  assert.equal(config.media.rename, 'safe');
  assert.equal(config.settings.content.merge, true);
  assert.equal(config.content.length, 1);
  const collection = config.content[0];
  assert.equal(collection.type, 'collection');
  assert.equal(collection.path, 'src/content/venues');
  assert.equal(collection.format, 'yaml-frontmatter');
  assert.equal(collection.filename, '{fields.slug}.md');
  assert.equal(collection.subfolders, false);
  const supported = new Set(['string', 'text', 'rich-text', 'boolean', 'image', 'number', 'select', 'object']);
  function fields(items) {
    const seen = new Set();
    for (const field of items) {
      assert.ok(field.name && !seen.has(field.name), `Missing/duplicate field: ${field.name}`);
      seen.add(field.name);
      assert.ok(supported.has(field.type), `Unsupported CMS field: ${field.type}`);
      if (field.pattern) new RegExp(typeof field.pattern === 'string' ? field.pattern : field.pattern.regex);
      if (field.type === 'object') fields(field.fields);
      if (field.type === 'select') assert.ok(field.options.values.length > 0);
    }
  }
  fields(collection.fields);
  const byName = Object.fromEntries(collection.fields.map(field => [field.name, field]));
  assert.deepEqual(Object.keys(byName).filter(name => name !== 'body').sort(), Object.keys(venueSchema.shape).sort(), 'CMS and Astro fields differ');
  assert.equal(byName.body.type, 'rich-text');
  assert.equal(byName.body.options.format, 'markdown');
  assert.equal(byName.published.default, false);
  assert.equal(byName.featured.type, 'boolean');
  for (const field of [byName.externalGalleryUrl, byName.video.fields.find(field => field.name === 'url')]) {
    const pattern = new RegExp(field.pattern);
    assert.ok(pattern.test(''), 'Optional URL fields must allow blank CMS inputs');
    assert.ok(pattern.test('https://example.invalid/gallery'));
    assert.ok(!pattern.test('javascript:alert(1)'));
  }
  assert.equal(byName.gallery.type, 'object');
  assert.ok(byName.gallery.list);
  assert.deepEqual(byName.amenities.options.values, featureOptions);
  assert.deepEqual(featureOptions.map(option => option.value).sort(), [...amenities].sort());
  assert.equal(byName.amenities.options.multiple, true);
  assert.equal(byName.fictional.hidden, true);
  assert.equal(config.settings.config, false);
  assert.deepEqual(byName.ceremonyOptions.options.values, [...ceremonyOptions]);
  return config;
}
export function validateContent() {
  validateCms();
  const directory = resolve(root, 'src/content/venues');
  const entries = readdirSync(directory, { recursive: true }).filter(file => file.endsWith('.md')).map(file => {
    const { raw } = readVenue(resolve(directory, file));
    const data = venueSchema.parse(raw);
    const images = [data.image, ...data.gallery.map(item => item.image), data.video.thumbnail].filter(Boolean);
    for (const image of images) assert.ok(existsSync(resolve(root, `public${image}`)), `Missing image in ${file}: ${image}`);
    return { id: file.replace(/\.md$/, ''), data };
  });
  const published = publishedVenues(entries);
  console.log(`Validated Pages CMS configuration and ${entries.length} venue record(s); ${published.length} eligible for builds.`);
  return entries;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) validateContent();
