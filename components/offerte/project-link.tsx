"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readProject, PROJECT_EVENT } from "@/lib/project-cart";
import { cn } from "@/lib/utils";

/** Header-link naar 'Jouw project' met live aantal kozijnen in het mandje. */
export function ProjectLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(readProject().length);
    update();
    window.addEventListener(PROJECT_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(PROJECT_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <Link
      href="/project"
      onClick={onClick}
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      Jouw project
      {count > 0 && (
        <span className="inline-flex min-w-5 items-center justify-center bg-lime px-1.5 text-xs font-bold text-ink">
          {count}
        </span>
      )}
    </Link>
  );
}
