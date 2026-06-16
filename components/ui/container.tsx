import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "narrow" | "default" | "wide";

const widths: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        widths[width],
        className,
      )}
    >
      {children}
    </div>
  );
}
