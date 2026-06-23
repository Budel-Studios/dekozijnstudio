"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, MenuIcon, CloseIcon, ArrowRightIcon } from "@/components/icons";
import { headerDirectLinks, footerGroups, primaryCta } from "@/lib/navigation";
import { megaGroups, type MegaGroup, type MegaLink } from "@/lib/mega-menu";
import { ProjectLink } from "@/components/offerte/project-link";
import { cn } from "@/lib/utils";

// ─── Trust signals shown in the top bar ───────────────────────────────────────

const trustItems = [
  "Prijzen altijd incl. btw",
  "Geen verborgen kosten",
  "Inmeetservice €49 — verrekend bij doorgang",
];

function TopBar() {
  return (
    <div className="bg-ink text-paper">
      <Container className="py-2">
        {/* Mobile: single item */}
        <p className="flex items-center justify-center gap-2 text-xs text-paper/75 sm:hidden">
          <span aria-hidden className="inline-block size-1.5 shrink-0 rounded-full bg-lime" />
          Transparante prijzen · geen verborgen kosten
        </p>
        {/* Desktop: all three */}
        <ul className="hidden items-center justify-center gap-8 sm:flex">
          {trustItems.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-paper/75">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-lime" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

// ─── Wordmark ─────────────────────────────────────────────────────────────────

function Wordmark() {
  return (
    <Link
      href="/"
      className="flex items-baseline gap-1.5 font-display text-lg font-semibold tracking-tight text-ink"
    >
      De Kozijnstudio
      <span aria-hidden className="size-1.5 translate-y-[-1px] rounded-full bg-lime" />
    </Link>
  );
}

// ─── Mega menu panel ──────────────────────────────────────────────────────────

function MegaPanel({ group, onNavigate }: { group: MegaGroup; onNavigate?: () => void }) {
  return (
    <div
      role="region"
      aria-label={`${group.label} menu`}
      className="absolute left-0 right-0 top-full border-b border-mist bg-paper/95 backdrop-blur-md shadow-soft"
    >
      <Container className="grid grid-cols-3 gap-0 py-8 lg:grid-cols-3">

        {/* Links + descriptions (2/3 width) */}
        <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-1 pr-10 border-r border-mist">
          {group.columns
            ? group.columns.map((col) => (
                <div key={col.heading}>
                  <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-wood">
                    {col.heading}
                  </p>
                  {col.links.map((link) => (
                    <MegaItem key={link.href} link={link} onNavigate={onNavigate} />
                  ))}
                </div>
              ))
            : (group.links ?? []).map((link) => (
                <MegaItem key={link.href} link={link} onNavigate={onNavigate} />
              ))}
        </div>

        {/* Trust block (1/3 width) */}
        <div className="pl-10 flex flex-col justify-between">
          <ul className="space-y-3">
            {group.trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink/70">
                <span aria-hidden className="mt-1 size-1.5 shrink-0 rounded-full bg-lime" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href={group.ctaHref} size="sm" className="w-full justify-center" onClick={onNavigate}>
              {group.ctaLabel}
            </Button>
          </div>
        </div>

      </Container>
    </div>
  );
}

function MegaItem({ link, onNavigate }: { link: MegaLink; onNavigate?: () => void }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="group/item block rounded-xl p-4 transition-colors hover:bg-paper-soft"
    >
      <p className="flex items-center gap-2 text-sm font-medium text-ink">
        {link.label}
        <ArrowRightIcon className="size-3.5 -translate-x-1 text-forest opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
      </p>
      <p className="mt-1 text-xs leading-relaxed text-ink/55">{link.description}</p>
    </Link>
  );
}

// ─── Mobile accordion ─────────────────────────────────────────────────────────

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div
      id="mobile-menu"
      className="max-h-[calc(100dvh-7rem)] overflow-y-auto border-t border-mist bg-paper lg:hidden"
    >
      <Container className="py-6 space-y-1">

        {/* Mega groups as accordions */}
        {megaGroups.map((group) => {
          const isOpen = openGroup === group.label;
          return (
            <div key={group.label}>
              <button
                type="button"
                onClick={() => setOpenGroup(isOpen ? null : group.label)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-paper-soft"
              >
                {group.label}
                <ChevronDownIcon
                  className={cn(
                    "size-4 text-ink/40 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <div className="mb-2 ml-3 space-y-0.5 border-l-2 border-lime/30 pl-4">
                  {(group.columns ? group.columns.flatMap((c) => c.links) : group.links ?? []).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="block rounded-lg px-2 py-2.5 text-sm text-ink/75 hover:text-ink"
                    >
                      <span className="font-medium">{link.label}</span>
                      <span className="ml-2 text-xs text-ink/45">
                        {link.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Direct links */}
        <div className="border-t border-mist pt-3 mt-3 space-y-0.5">
          {headerDirectLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block rounded-xl px-3 py-3 text-sm font-medium text-ink/75 hover:bg-paper-soft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Trust points */}
        <div className="border-t border-mist pt-4 mt-3">
          <ul className="space-y-2">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-ink/55">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-lime" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 pb-2 space-y-3">
          <ProjectLink
            onClick={onClose}
            className="w-full justify-center border border-mist px-4 py-3 text-sm font-medium text-ink"
          />
          <Button href={primaryCta.href} className="w-full justify-center" onClick={onClose}>
            {primaryCta.label}
          </Button>
        </div>
      </Container>
    </div>
  );
}

// ─── useScrolled ──────────────────────────────────────────────────────────────

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();
  const headerRef = useRef<HTMLDivElement>(null);

  // Close-intent delay: bridges the gap between trigger and panel so the menu
  // doesn't vanish while the cursor travels from the button to the panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openMenu = (label: string) => {
    cancelClose();
    setOpenGroup(label);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenGroup(null), 160);
  };
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mega menu on escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="sticky top-0 z-50" ref={headerRef}>
      <TopBar />

      <header
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className={cn(
          "transition-all duration-300",
          scrolled || openGroup || mobileOpen
            ? "border-b border-white/20 bg-white/85 shadow-soft backdrop-blur-md"
            : "border-b border-transparent bg-white/60 backdrop-blur-sm",
        )}
      >
        <Container className="flex h-15 items-center justify-between gap-6">
          <Wordmark />

          {/* Desktop nav */}
          <nav aria-label="Hoofdmenu" className="hidden items-center gap-0.5 lg:flex">

            {/* Mega menu triggers */}
            {megaGroups.map((group) => {
              const isOpen = openGroup === group.label;
              return (
                <div
                  key={group.label}
                  onMouseEnter={() => openMenu(group.label)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    data-open={isOpen}
                    onClick={() => (isOpen ? setOpenGroup(null) : openMenu(group.label))}
                    className={cn(
                      "nav-underline inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium transition-colors",
                      isOpen ? "text-ink" : "text-ink/70 hover:text-ink",
                    )}
                  >
                    {group.label}
                    <ChevronDownIcon
                      className={cn(
                        "size-3.5 text-ink/40 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>
              );
            })}

            {/* Direct links — hovering one closes any open mega panel */}
            {headerDirectLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setOpenGroup(null)}
                className="nav-underline px-3.5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <ProjectLink className="text-sm font-medium text-ink/70 transition-colors hover:text-ink" />
            <Button href={primaryCta.href} size="sm">
              {primaryCta.label}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            className="inline-flex size-10 items-center justify-center rounded-pill text-ink hover:bg-black/5 lg:hidden"
          >
            {mobileOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </Container>

        {/* Desktop mega panel — DOM child of <header>, so hovering it never
            triggers the header's onMouseLeave (the menu stays open). */}
        {openGroup && (
          <div>
            {megaGroups
              .filter((g) => g.label === openGroup)
              .map((g) => (
                <MegaPanel key={g.label} group={g} onNavigate={() => setOpenGroup(null)} />
              ))}
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </div>
  );
}
