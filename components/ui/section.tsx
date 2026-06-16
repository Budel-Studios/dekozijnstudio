import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "paper" | "soft" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  soft: "bg-paper-soft text-ink",
  ink: "bg-ink text-paper",
};

/**
 * Vertical rhythm wrapper for page sections.
 * `tone` switches the background; `as` allows semantic tags (section/header/...).
 */
export function Section({
  children,
  className,
  tone = "paper",
  as: Tag = "section",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  as?: ElementType;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      {children}
    </Tag>
  );
}
