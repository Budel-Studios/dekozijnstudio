import Link from "next/link";
import { cn } from "@/lib/utils";

/** Four-pane window-frame mark — the brand symbol. Inherits currentColor. */
export function WindowMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-8 shrink-0 grid-cols-2 gap-0.5 rounded-[5px] border-2 border-current p-1",
        className,
      )}
    >
      <i className="rounded-tl-[2px] border-r border-current" />
      <i />
      <i className="border-r border-t border-current" />
      <i className="border-t border-current" />
    </span>
  );
}

/** Wordmark + window mark. `inverse` for dark backgrounds (lime accent). */
export function Logo({
  inverse = false,
  className,
}: {
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="De Kozijnstudio, naar de homepage"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md",
        inverse ? "text-paper" : "text-ink",
        className,
      )}
    >
      <WindowMark />
      <span className="font-display text-lg font-bold tracking-tight sm:text-xl">
        De <span className={inverse ? "text-lime" : undefined}>Kozijn</span>studio
      </span>
    </Link>
  );
}
