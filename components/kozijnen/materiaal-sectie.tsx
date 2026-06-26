import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Sectiewrapper voor de kozijnengids: eyebrow + kop + intro + inhoud.
 * `id` maakt ankerlinks mogelijk; `tone` wisselt de achtergrond (paper/soft/ink).
 */
export function MateriaalSectie({
  id,
  eyebrow,
  titel,
  intro,
  tone = "paper",
  children,
}: {
  id?: string;
  eyebrow: string;
  titel: string;
  intro?: ReactNode;
  tone?: "paper" | "soft" | "ink";
  children?: ReactNode;
}) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 text-2xl text-ink sm:text-3xl">{titel}</h2>
        {intro && (
          <p className="mt-4 max-w-3xl leading-relaxed text-ink/65">{intro}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </Section>
  );
}
