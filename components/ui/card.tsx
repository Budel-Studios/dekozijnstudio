import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-mist bg-paper p-6 transition-shadow duration-300 hover:shadow-soft sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardEyebrow({ children }: { children: ReactNode }) {
  return <Eyebrow>{children}</Eyebrow>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="mt-3 text-xl text-ink">{children}</h3>;
}

export function CardBody({ children }: { children: ReactNode }) {
  return <p className="mt-3 leading-relaxed text-ink/70">{children}</p>;
}
