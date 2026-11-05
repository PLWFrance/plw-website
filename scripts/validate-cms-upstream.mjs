// Explicit, network-dependent audit against the real Pages CMS schema.
// Kept separate from normal builds so builds do not depend on GitHub availability.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { parse } from 'yaml';

const ref = '6f4e860a35d934406580287e7042e5e111e207a1';
const root = new URL('../', import.meta.url);
const cache = new URL('work/pages-cms/', root);
mkdirSync(cache, { recursive: true });
const sources = [
  ['lib/config-schema.ts', 'cc434fd87bcebc80aa8fe777b99c7d0f943ef11f'],
  ['fields/registry.ts', 'a2a13546fb39222a8e3e2c2c658e1f21ae8abd1e'],
];
const contents = [];
for (const [path, sha] of sources) {
  const local = new URL(path.replaceAll('/', '-'), cache);
  if (!process.argv.includes('--cached')) {
    const response = await fetch(`https://raw.githubusercontent.com/hunvreus/pagescms/${ref}/${path}`);
    assert.ok(response.ok, `Cannot fetch ${path}: ${response.status}`);
    writeFileSync(local, await response.text());
  }
  const source = readFileSync(local, 'utf8');
  const hash = createHash('sha1').update(`blob ${Buffer.byteLength(source)}\0`).update(source).digest('hex');
  assert.equal(hash, sha, `Unexpected upstream source: ${path}`);
  contents.push(source);
}
const types = [...contents[1].matchAll(/registerField\("([^"]+)"/g)].map(match => match[1]);
assert.ok(types.length > 0);
// Use Zod's v3 compatibility export: upstream Pages CMS uses Zod 3, Astro uses 4.
const executable = contents[0].replace('from "zod"', 'from "zod/v3"')
  .replace('import { fieldTypes } from "@/fields/registry";', `const fieldTypes = new Set(${JSON.stringify(types)});`);
writeFileSync(new URL('config-schema.ts', cache), executable);
const { ConfigSchema } = await import(new URL('config-schema.ts', cache));
ConfigSchema.parse(parse(readFileSync(new URL('.pages.yml', root), 'utf8')));
console.log(`Pages CMS 2.1.8 upstream schema passed (${ref}). Field options additionally checked by validate:content.`);
