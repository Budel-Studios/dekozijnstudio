/**
 * Content layer for the kennisbank (knowledge base).
 * Articles are stored as MDX files in /content/kennisbank/*.mdx.
 * This file is the single interface between the filesystem and the pages —
 * swap the implementation (e.g. Supabase, a headless CMS) here without
 * touching any page components.
 *
 * How to add an article:
 *   1. Create /content/kennisbank/<slug>.mdx
 *   2. Add the required frontmatter fields (see ArticleMeta below).
 *   3. The article auto-appears in the kennisbank index and gets its own page.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "kennisbank");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date string, e.g. "2025-06-08" */
  date: string;
  dateModified?: string;
  category: string;
  /** Slugs of related articles (max 3) */
  related: string[];
  /** Approximate reading time in minutes */
  readTime: number;
  keywords: string[];
};

export type Article = ArticleMeta & {
  /** Raw MDX source — passed to MDXRemote */
  content: string;
};

function parseFile(slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString().slice(0, 10),
    dateModified: data.dateModified,
    category: data.category ?? "Algemeen",
    related: Array.isArray(data.related) ? data.related : [],
    readTime: data.readTime ?? estimateReadTime(content),
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    content,
  };
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230)); // ~230 Dutch words/min
}

/** Returns all article slugs derived from filenames in /content/kennisbank. */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Returns all article metadata sorted by date (newest first). */
export function getAllArticles(): ArticleMeta[] {
  return getAllSlugs()
    .map((slug) => parseFile(slug))
    .filter((a): a is Article => a !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Returns full article (metadata + MDX source) for a given slug. */
export function getArticle(slug: string): Article | null {
  return parseFile(slug);
}

/** Returns metadata for a set of slugs — used for related articles. */
export function getRelatedArticles(slugs: string[]): ArticleMeta[] {
  return slugs
    .map((slug) => {
      const article = parseFile(slug);
      if (!article) return null;
      const { content: _content, ...meta } = article;
      return meta;
    })
    .filter((a): a is ArticleMeta => a !== null);
}
