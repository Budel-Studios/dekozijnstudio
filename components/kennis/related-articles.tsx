import Link from "next/link";
import type { ArticleMeta } from "@/lib/content";
import { ArrowRightIcon } from "@/components/icons";

export function RelatedArticles({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null;

  return (
    <aside aria-label="Gerelateerde artikelen">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/40">
        Gerelateerde artikelen
      </p>
      <ul className="space-y-2">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/kennis/${a.slug}`}
              className="group flex items-start gap-3 rounded-xl border border-mist bg-paper p-4 transition-shadow hover:shadow-soft"
            >
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-wood">
                  {a.category}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-ink group-hover:text-forest transition-colors">
                  {a.title}
                </p>
              </div>
              <ArrowRightIcon className="mt-0.5 size-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:text-forest" />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
