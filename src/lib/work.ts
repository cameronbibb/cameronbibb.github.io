import type { CollectionEntry } from "astro:content";

/**
 * A work entry gets its own detail page when it
 * has body content to show. Both the card link and the [...slug] route use
 * this, so a card never links to a page the route didn't build.
 */
export function hasDetailPage(entry: CollectionEntry<"work">): boolean {
  return Boolean(entry.body?.trim());
}
