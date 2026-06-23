/**
 * "Jouw project" — winkelmandje voor meerdere kozijnen.
 * Opslag in localStorage (geen backend). Elk item is één geconfigureerd kozijn
 * + de aangevinkte montage-regels. Alleen client-side gebruiken.
 */

import type { KozijnConfig } from "@/lib/configurator-price";

export type ProjectItem = {
  id: string;
  config: KozijnConfig;
  montageChecked: string[];
};

const KEY = "kozijn-project";
export const PROJECT_EVENT = "kozijn-project-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function emit() {
  if (isBrowser()) window.dispatchEvent(new Event(PROJECT_EVENT));
}

export function readProject(): ProjectItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ProjectItem[]) : [];
  } catch {
    return [];
  }
}

export function writeProject(items: ProjectItem[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    emit();
  } catch {
    /* opslag vol/onbeschikbaar — negeren */
  }
}

function newId(): string {
  if (isBrowser() && "randomUUID" in crypto) return crypto.randomUUID();
  return `item-${readProject().length + 1}-${Math.floor(performance.now())}`;
}

export function addToProject(config: KozijnConfig, montageChecked: string[]): ProjectItem[] {
  const items = readProject();
  items.push({ id: newId(), config, montageChecked });
  writeProject(items);
  return items;
}

export function removeFromProject(id: string): ProjectItem[] {
  const items = readProject().filter((i) => i.id !== id);
  writeProject(items);
  return items;
}

export function updateItemMontage(id: string, montageChecked: string[]): ProjectItem[] {
  const items = readProject().map((i) => (i.id === id ? { ...i, montageChecked } : i));
  writeProject(items);
  return items;
}

export function clearProject(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(KEY);
  emit();
}
