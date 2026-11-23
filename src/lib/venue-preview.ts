/** This build gate is not authentication: Cloudflare Access must protect previews. */
export function venuePreviewEnabled(
  development: boolean,
  environment: { ENABLE_VENUE_PREVIEW?: string; CF_PAGES_BRANCH?: string },
): boolean {
  return development || (
    environment.ENABLE_VENUE_PREVIEW === 'true' &&
    environment.CF_PAGES_BRANCH === 'migration/the-romantic-chateau'
  );
}
