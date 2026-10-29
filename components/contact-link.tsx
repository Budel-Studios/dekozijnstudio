"use client";

import type { ReactNode } from "react";
import { company } from "@/data/company";
import { track } from "@/lib/track";

/**
 * Phone / WhatsApp link that records a click as contact intent
 * (click_phone / click_whatsapp) — kept separate from confirmed leads.
 */
export function ContactLink({
  kind,
  children,
  className,
  location,
}: {
  kind: "phone" | "whatsapp";
  children: ReactNode;
  className?: string;
  location?: string;
}) {
  const href =
    kind === "phone" ? `tel:${company.telefoonHref}` : `https://wa.me/${company.whatsappHref}`;
  return (
    <a
      href={href}
      className={className}
      {...(kind === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => track(kind === "phone" ? "click_phone" : "click_whatsapp", { location })}
    >
      {children}
    </a>
  );
}
