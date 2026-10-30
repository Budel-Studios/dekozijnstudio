"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { headerGroups, headerDirectLinks, primaryCta, type NavGroup } from "@/lib/navigation";
import { ProjectLink } from "@/components/offerte/project-link";
import { ContactLink } from "@/components/contact-link";
import { Logo } from "@/components/logo";
import { company } from "@/data/company";
import { MODULES } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Site header — same structure as mtbbouw.com, so visitors recognise the
 * MTB Bouw family: one light bar, logo with "een merk van MTB Bouw", the menu
 * right next to the logo, mega menus with numbered links and an intro column,
 * and on the right the request button plus an outlined phone button. On
 * smaller screens: "Bel" + "Menu" and a full-screen menu.
 *
 * Every menu link is in the server HTML (panels use the `hidden` attribute,
 * not conditional rendering), so crawlers and no-JS visitors reach all pages.
 */

const panelId = (group: NavGroup) => `menu-${group.label.toLowerCase().replace(/\s+/g, "-")}`;

function MegaPanel({ group, open, onClose }: { group: NavGroup; open: boolean; onClose: () => void }) {
  return (
    <div
      id={panelId(group)}
      hidden={!open}
      className="absolute inset-x-0 top-full z-40 border-b border-mist bg-paper shadow-soft"
    >
      <div className="mx-auto grid w-full max-w-[96rem] gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[0.8fr_2fr] lg:px-8">
        {group.intro && (
          <div>
            {/* p, not h2: menu panels are on every page and stay out of the outline. */}
            <p className="font-display text-2xl leading-tight tracking-[-0.02em] text-ink">{group.intro.title}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/60">{group.intro.text}</p>
            <Link
              href={group.intro.href}
              onClick={onClose}
              className="group mt-6 inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {group.intro.button}
              <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
        <ul className="grid content-start gap-x-10 gap-y-5 sm:grid-cols-2">
          {group.links.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex border-b border-mist pb-3 transition-[padding] duration-200 hover:pl-2"
              >
                <span className="label-num mr-5 pt-0.5 text-forest">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-lg font-medium tracking-[-0.01em] text-ink">{link.label}</span>
                  {link.description && (
                    <span className="mt-0.5 block text-sm leading-snug text-ink/55">{link.description}</span>
                  )}
                </span>
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
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Close menus after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileSub(null);
  }

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenGroup(null), 160);
  }, [cancelClose]);
  const closeAll = useCallback(() => {
    cancelClose();
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileSub(null);
  }, [cancelClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [closeAll]);

  // No page scroll behind the full-screen mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="sticky top-0 z-50" ref={ref} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
      <header className="relative border-b border-mist bg-paper-soft/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[96rem] items-stretch px-5 sm:px-6 lg:px-8">
          {/* Logo + endorsement */}
          <div className="flex shrink-0 items-center gap-4">
            <Logo />
            <Link
              href="/mtb-bouw"
              onClick={closeAll}
              className="label-mono hidden border-l border-mist pl-4 text-ink/55 transition-colors hover:text-ink sm:block"
            >
              <span className="block">Een merk van</span>
              <span className="block text-ink/85">MTB Bouw</span>
            </Link>
          </div>

          {/* Desktop menu, right next to the logo */}
          <nav aria-label="Hoofdmenu" className="ml-8 hidden items-stretch gap-7 xl:flex">
            {headerGroups.map((group) => {
              const open = openGroup === group.label;
              return (
                <div
                  key={group.label}
                  className={cn(
                    "flex items-stretch border-b-2 transition-colors",
                    open ? "border-lime" : "border-transparent",
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId(group)}
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenGroup(group.label);
                    }}
                    onClick={() => setOpenGroup(open ? null : group.label)}
                    className={cn(
                      "flex items-center gap-1.5 whitespace-nowrap text-[0.9375rem] font-medium transition-colors",
                      open ? "text-ink" : "text-ink/70 hover:text-ink",
                    )}
                  >
                    {group.label}
                    <ChevronDownIcon
                      className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")}
                    />
                  </button>
                </div>
              );
            })}
            {headerDirectLinks.map((link) => (
              <div key={link.href} className="flex items-stretch border-b-2 border-transparent">
                <Link
                  href={link.href}
                  onClick={closeAll}
                  onMouseEnter={() => setOpenGroup(null)}
                  className="flex items-center whitespace-nowrap text-[0.9375rem] font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right: project, request button and outlined phone button */}
          <div className="ml-auto hidden shrink-0 items-center gap-3 pl-6 xl:flex" onMouseEnter={() => setOpenGroup(null)}>
            {/* Only on very wide screens; below that it is in the mobile menu and the configurator flow. */}
            {MODULES.configurator && (
              <span className="mr-2 hidden 2xl:block">
                <ProjectLink className="whitespace-nowrap text-sm font-medium text-ink/70 transition-colors hover:text-ink" />
              </span>
            )}
            <Button href={primaryCta.href} size="sm" onClick={closeAll} className="whitespace-nowrap">
              {primaryCta.label}
            </Button>
            <ContactLink
              kind="phone"
              location="header"
              className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-pill border border-ink/25 px-4 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <PhoneIcon className="size-3.5" />
              {company.telefoon}
            </ContactLink>
          </div>

          {/* Mobile: "Bel" + "Menu" */}
          <div className="ml-auto flex items-center gap-1 pl-3 xl:hidden">
            <ContactLink
              kind="phone"
              location="header-mobile"
              className="inline-flex h-10 items-center gap-1.5 rounded-pill border border-ink/25 px-3 text-sm font-semibold text-ink"
            >
              <PhoneIcon className="size-3.5" />
              {/* Very small phones: icon only, so logo and menu keep their space. */}
              <span className="max-[379px]:sr-only">Bel</span>
            </ContactLink>
            <button
              type="button"
              onClick={() => {
                setMobileOpen((o) => !o);
                setMobileSub(null);
              }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 items-center gap-1.5 pl-2 text-sm font-semibold text-ink"
            >
              {mobileOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
              Menu
            </button>
          </div>
        </div>

        {/* Desktop mega menus — always in the DOM, visibility via `hidden`. */}
        <div className="hidden xl:block">
          {headerGroups.map((group) => (
            <MegaPanel
              key={group.label}
              group={group}
              open={openGroup === group.label}
              onClose={closeAll}
            />
          ))}
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <nav
        id="mobile-menu"
        aria-label="Mobiel menu"
        hidden={!mobileOpen}
        // Close after any link — also when the link opens the request panel instead of navigating.
        onClick={(e) => (e.target as Element).closest("a") && closeAll()}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper xl:hidden"
      >
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-4 sm:px-6">
          <ul>
            {headerGroups.map((group) => {
              const open = mobileSub === group.label;
              return (
                <li key={group.label} className="border-b border-mist">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setMobileSub(open ? null : group.label)}
                    className="flex w-full items-center justify-between py-4 text-left text-2xl font-medium tracking-[-0.02em] text-ink"
                  >
                    {group.label}
                    <ChevronDownIcon
                      className={cn("size-5 text-ink/45 transition-transform", open ? "rotate-180" : "-rotate-90")}
                    />
                  </button>
                  <ul hidden={!open} className="space-y-4 pb-5">
                    {group.links.map((link, i) => (
                      <li key={link.href}>
                        <Link href={link.href} className="flex border-b border-mist/70 pb-3">
                          <span className="label-num mr-4 pt-0.5 text-forest">{String(i + 1).padStart(2, "0")}</span>
                          <span>
                            <span className="block text-lg font-medium text-ink">{link.label}</span>
                            {link.description && (
                              <span className="mt-0.5 block text-sm text-ink/55">{link.description}</span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
            {headerDirectLinks.map((link) => (
              <li key={link.href} className="border-b border-mist">
                <Link href={link.href} className="block py-4 text-2xl font-medium tracking-[-0.02em] text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3">
            <Button href={primaryCta.href} className="w-full justify-center">
              {primaryCta.label}
            </Button>
            {MODULES.configurator && (
              <ProjectLink className="w-full justify-center border border-mist px-4 py-3 text-sm font-medium text-ink" />
            )}
            <ContactLink
              kind="phone"
              location="mobile-menu"
              className="flex w-full items-center justify-center gap-2 rounded-pill border border-ink/25 px-4 py-3 text-sm font-semibold text-ink"
            >
              <PhoneIcon className="size-4" />
              {company.telefoon}
            </ContactLink>
          </div>

          <p className="label-mono mt-10 text-ink/55">
            Een merk van{" "}
            <Link href="/mtb-bouw" className="text-ink underline underline-offset-4">
              MTB Bouw
            </Link>
          </p>
        </div>
      </nav>
    </div>
  );
}
