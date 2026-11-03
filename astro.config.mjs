import { defineConfig } from 'astro/config';
// Static output is ready for Cloudflare Pages; no server adapter is required.
export default defineConfig({ output: 'static', trailingSlash: 'always' });
