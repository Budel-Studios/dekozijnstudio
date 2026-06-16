/**
 * Minimal className combiner — joins truthy class strings.
 * Kept dependency-free for the fase 1 wireframe foundation.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
