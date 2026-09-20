import Link from "next/link";
import { Fragment } from "react";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export type Crumb = {
  label: string;
  href?: string;
};

/**
 * Kruimelpad plus bijbehorende BreadcrumbList-JSON-LD. Het schema hoort bij het
 * zichtbare pad, dus we zenden het hier uit: elke pagina met een kruimelpad
 * krijgt het automatisch (SEO-plan §3).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Kruimelpad">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(items)) }}
      />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink/55">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-forest"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="text-ink">
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="text-ink/30">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
