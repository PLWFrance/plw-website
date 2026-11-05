import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';
import { featureOptions } from '../src/lib/venue-features.ts';

const path = fileURLToPath(new URL('../.pages.yml', import.meta.url));
const document = parseDocument(readFileSync(path, 'utf8'), { uniqueKeys: true });
assert.equal(document.errors.length, 0, 'Invalid CMS YAML');
const fields = document.getIn(['content', 0, 'fields']);
const field = fields.items.find(item => item.get('name') === 'amenities');
assert.ok(field, 'Missing venue features field');
if (process.argv.includes('--write')) {
  field.setIn(['options', 'values'], featureOptions);
  writeFileSync(path, String(document));
  console.log('Updated CMS choices. Review the diff and run validation before committing.');
} else {
  assert.deepEqual(field.getIn(['options', 'values']).toJSON(), featureOptions,
    'Feature choices are out of date. Run npm run sync:features -- --write');
  console.log('CMS feature choices match the catalogue.');
}
