/**
 * Table-of-Contents extraction from MDX source.
 * Parses ## and ### headings; generates IDs that match rehype-slug output
 * so anchor links work correctly.
 */

export type TocItem = {
  title: string;
  id: string;
  level: 2 | 3;
};

/** Mirrors the ID algorithm used by github-slugger (used by rehype-slug). */
function toId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")   // remove non-word chars except hyphens
    .replace(/\s+/g, "-")        // spaces → hyphens
    .replace(/-+/g, "-")         // collapse multiple hyphens
    .replace(/^-|-$/g, "");      // trim leading/trailing hyphens
}

export function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const items: TocItem[] = [];
  const seen = new Map<string, number>();

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    // Strip inline MDX/markdown formatting from heading title
    const title = match[2].replace(/[`*_[\]()]/g, "").trim();
    let id = toId(title);

    // Handle duplicate IDs (same algorithm as github-slugger)
    const count = seen.get(id) ?? 0;
    if (count > 0) id = `${id}-${count}`;
    seen.set(id, count + 1);

    items.push({ title, id, level });
  }

  return items;
}
