"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, MenuIcon, CloseIcon } from "@/components/icons";
import { headerGroups, headerDirectLinks, primaryCta, type NavGroup } from "@/lib/navigation";
import { ProjectLink } from "@/components/offerte/project-link";
import { Logo } from "@/components/logo";
import { MODULES } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Site header. Every menu link is rendered in the server HTML (dropdowns are
 * hidden with the `hidden` attribute, not left out of the DOM), so crawlers
 * and visitors without JavaScript reach all pages via plain <a href> links.
 */

const trustItems = [
  "Prijzen inclusief btw",
  "Voorstel uitgesplitst per onderdeel",
  "Vanuit Enschede, in heel Twente",
];

function TopBar() {
  return (
    <div className="bg-ink text-paper">
      <Container className="py-2">
        <ul className="flex items-center justify-center gap-8 text-xs text-paper/75">
          {trustItems.map((item, i) => (
            <li key={item} className={cn("items-center gap-2", i === 0 ? "flex" : "hidden sm:flex")}>
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-lime" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

function Dropdown({
  group,
  open,
  onOpen,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const id = `menu-${group.label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? onClose() : onOpen())}
        className={cn(
          "nav-underline inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors",
          open ? "text-ink" : "text-ink/70 hover:text-ink",
        )}
      >
        {group.label}
        <ChevronDownIcon
          className={cn("size-3.5 text-ink/40 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <div id={id} hidden={!open} className="absolute left-0 top-full z-50 pt-2">
        <ul className="w-80 rounded-card border border-mist bg-paper p-2 shadow-soft">
          {group.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-xl px-4 py-3 transition-colors hover:bg-paper-soft"
              >
                <span className="block text-sm font-medium text-ink">{link.label}</span>
                {link.description && (
                  <span className="mt-0.5 block text-xs text-ink/55">{link.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menus after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50" ref={ref}>
      <TopBar />
      <header
        className={cn(
          "border-b transition-all duration-300",
          scrolled || mobileOpen
            ? "border-mist bg-paper-soft/95 shadow-soft backdrop-blur-md"
            : "border-mist/60 bg-paper-soft/90 backdrop-blur-sm",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Hoofdmenu" className="hidden items-center gap-1 xl:flex">
            {headerGroups.map((group) => (
              <Dropdown
                key={group.label}
                group={group}
                open={openGroup === group.label}
                onOpen={() => setOpenGroup(group.label)}
                onClose={() => setOpenGroup(null)}
              />
            ))}
            {headerDirectLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-underline whitespace-nowrap px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 xl:flex">
            {MODULES.configurator && (
              <ProjectLink className="whitespace-nowrap text-sm font-medium text-ink/70 transition-colors hover:text-ink" />
            )}
            <Button href={primaryCta.href} size="sm">
              {primaryCta.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            className="inline-flex size-11 items-center justify-center rounded-pill border border-ink/20 text-ink hover:border-ink xl:hidden"
          >
            {mobileOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </Container>
      </header>

      <nav
        id="mobile-menu"
        aria-label="Mobiel menu"
        hidden={!mobileOpen}
        // Close after any link — also when the link opens the request panel instead of navigating.
        onClick={(e) => (e.target as Element).closest("a") && setMobileOpen(false)}
        className="max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-b-3xl border-t border-mist bg-paper shadow-soft xl:hidden"
      >
        <Container className="space-y-6 py-6">
          {headerGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-xs font-semibold uppercase tracking-widest text-wood">{group.label}</p>
              <ul className="mt-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-paper-soft hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="border-t border-mist pt-4">
            {headerDirectLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-paper-soft hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-3 pb-2">
            {MODULES.configurator && (
              <ProjectLink className="w-full justify-center border border-mist px-4 py-3 text-sm font-medium text-ink" />
            )}
            <Button href={primaryCta.href} className="w-full justify-center">
              {primaryCta.label}
            </Button>
          </div>
        </Container>
      </nav>
    </div>
  );
}
