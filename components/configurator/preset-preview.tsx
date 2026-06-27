import type { ReactNode } from "react";

/**
 * Compositie-tekening voor voorgeconfigureerde producten.
 *
 * Tekent een willekeurige samenstelling (zijlichten, bovenlichten, meerdere
 * vlakken, dubbele draaikiep, deuren) uit een kleine layout-boom. Bewust op een
 * VAST canvas (300×230) zonder maatlijnen, zodat elke kaarttekening exact even
 * groot is. Puur SVG — geen client-JS.
 */

// ─── Layout-model ─────────────────────────────────────────────────────────────

export type Leaf =
  | { kind: "vast" }
  | { kind: "draaikiep"; hinge: "links" | "rechts" }
  | { kind: "draai"; hinge: "links" | "rechts" }
  | { kind: "valraam" }
  | { kind: "deur"; variant: "voordeur" | "achterdeur" | "tuindeur" };

export type Cell =
  | Leaf
  | { split: "cols" | "rows"; children: { weight?: number; cell: Cell }[] };

// ─── Kleurhulp ────────────────────────────────────────────────────────────────

function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function shade(hex: string, amount: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const adjust = (c: number) =>
    clamp(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount);
  return `#${[adjust(r), adjust(g), adjust(b)]
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;
}

type Ctx = { frameColor: string; frameDark: string; gradId: string };

// ─── Celinhoud ────────────────────────────────────────────────────────────────

function Glass({ x, y, w, h, gradId }: { x: number; y: number; w: number; h: number; gradId: string }) {
  if (w <= 0 || h <= 0) return null;
  return <rect x={x} y={y} width={w} height={h} fill={`url(#${gradId})`} stroke="#9fb4bd" strokeWidth={0.5} />;
}

function drawLeaf(leaf: Leaf, x: number, y: number, w: number, h: number, ctx: Ctx, key: string): ReactNode {
  const { frameColor, frameDark, gradId } = ctx;
  const sw = Math.max(3, Math.min(w, h) * 0.07); // vleugeldikte
  const hingeStroke = "#5b6b73";

  // Vast glas
  if (leaf.kind === "vast") {
    return <Glass key={key} x={x} y={y} w={w} h={h} gradId={gradId} />;
  }

  // Valraam — kiep aan de onderzijde
  if (leaf.kind === "valraam") {
    const gx = x + sw, gy = y + sw, gw = w - 2 * sw, gh = h - 2 * sw;
    const handleW = Math.max(8, w * 0.12);
    return (
      <g key={key}>
        <rect x={x} y={y} width={w} height={h} fill={frameColor} stroke={frameDark} strokeWidth={0.6} />
        <Glass x={gx} y={gy} w={gw} h={gh} gradId={gradId} />
        <polyline points={`${gx},${gy} ${gx + gw / 2},${gy + gh} ${gx + gw},${gy}`} fill="none" stroke={hingeStroke} strokeWidth={0.8} strokeDasharray="4 3" />
        <rect x={x + w / 2 - handleW / 2} y={y - 1.5} width={handleW} height={3} rx={1.5} fill={frameDark} />
      </g>
    );
  }

  // Draaikiep of draai (openslaand)
  if (leaf.kind === "draaikiep" || leaf.kind === "draai") {
    const gx = x + sw, gy = y + sw, gw = w - 2 * sw, gh = h - 2 * sw;
    const links = leaf.hinge === "links";
    // draai-symbool: apex aan de scharnierzijde
    const draai = links
      ? `${gx + gw},${gy} ${gx},${gy + gh / 2} ${gx + gw},${gy + gh}`
      : `${gx},${gy} ${gx + gw},${gy + gh / 2} ${gx},${gy + gh}`;
    const handleH = Math.max(8, h * 0.14);
    const handleX = links ? x + w - 2.5 : x - 0.5; // greep tegenover scharnier
    return (
      <g key={key}>
        <rect x={x} y={y} width={w} height={h} fill={frameColor} stroke={frameDark} strokeWidth={0.6} />
        <Glass x={gx} y={gy} w={gw} h={gh} gradId={gradId} />
        <polyline points={draai} fill="none" stroke={hingeStroke} strokeWidth={0.8} strokeDasharray="4 3" />
        {leaf.kind === "draaikiep" && (
          <polyline points={`${gx},${gy} ${gx + gw / 2},${gy + gh} ${gx + gw},${gy}`} fill="none" stroke={hingeStroke} strokeWidth={0.8} strokeDasharray="4 3" />
        )}
        <rect x={handleX} y={y + h / 2 - handleH / 2} width={3} height={handleH} rx={1.5} fill={frameDark} />
      </g>
    );
  }

  // Deuren
  if (leaf.kind === "deur") {
    if (leaf.variant === "tuindeur") {
      const mid = Math.max(3, sw * 0.9);
      const leafW = (w - mid) / 2;
      const doorLeaf = (lx: number, handleRight: boolean, k: string) => {
        const ggx = lx + sw, ggy = y + sw, ggw = leafW - 2 * sw, ggh = h - 2 * sw;
        const handleH = Math.max(10, h * 0.16);
        return (
          <g key={k}>
            <rect x={lx} y={y} width={leafW} height={h} fill={frameColor} stroke={frameDark} strokeWidth={0.6} />
            <Glass x={ggx} y={ggy} w={ggw} h={ggh} gradId={gradId} />
            <rect x={handleRight ? lx + leafW - 4 : lx + 1.5} y={y + h / 2 - handleH / 2} width={2.5} height={handleH} rx={1.25} fill="#9aa0a3" />
          </g>
        );
      };
      return (
        <g key={key}>
          {doorLeaf(x, true, `${key}-l`)}
          {doorLeaf(x + leafW + mid, false, `${key}-r`)}
        </g>
      );
    }

    // Voordeur / achterdeur — glas boven, paneel onder
    const glasFrac = leaf.variant === "achterdeur" ? 0.58 : 0.38;
    const gx = x + sw, gy = y + sw, gw = w - 2 * sw;
    const glasH = (h - 2 * sw) * glasFrac;
    const paneelY = gy + glasH + sw * 0.6;
    const paneelH = y + h - sw - paneelY;
    const handleH = Math.max(12, h * 0.16);
    return (
      <g key={key}>
        <rect x={x} y={y} width={w} height={h} fill={frameColor} stroke={frameDark} strokeWidth={0.6} />
        <Glass x={gx} y={gy} w={gw} h={glasH} gradId={gradId} />
        <rect x={gx} y={paneelY} width={gw} height={Math.max(0, paneelH)} fill={frameDark} stroke={frameDark} strokeWidth={0.4} />
        <rect x={x + (leaf.variant === "voordeur" ? 4 : 4)} y={y + h * 0.5 - handleH / 2} width={3} height={handleH} rx={1.5} fill="#9aa0a3" />
      </g>
    );
  }

  return null;
}

// ─── Recursieve celverdeling ──────────────────────────────────────────────────

function drawCell(cell: Cell, x: number, y: number, w: number, h: number, ctx: Ctx, key: string): ReactNode {
  if ("split" in cell) {
    const m = 6; // stijl/dorpeldikte tussen vlakken
    const isCols = cell.split === "cols";
    const kids = cell.children;
    const totalWeight = kids.reduce((s, k) => s + (k.weight ?? 1), 0);
    const avail = (isCols ? w : h) - m * (kids.length - 1);
    const items: ReactNode[] = [];
    let cur = isCols ? x : y;
    kids.forEach((k, i) => {
      const size = avail * ((k.weight ?? 1) / totalWeight);
      const cx = isCols ? cur : x;
      const cy = isCols ? y : cur;
      const cw = isCols ? size : w;
      const ch = isCols ? h : size;
      items.push(drawCell(k.cell, cx, cy, cw, ch, ctx, `${key}-${i}`));
      if (i < kids.length - 1) {
        items.push(
          <rect
            key={`${key}-m${i}`}
            x={isCols ? cur + size : x}
            y={isCols ? y : cur + size}
            width={isCols ? m : w}
            height={isCols ? h : m}
            fill={ctx.frameColor}
            stroke={ctx.frameDark}
            strokeWidth={0.5}
          />,
        );
      }
      cur += size + m;
    });
    return <g key={key}>{items}</g>;
  }
  return drawLeaf(cell, x, y, w, h, ctx, key);
}

// ─── Hoofdcomponent ──────────────────────────────────────────────────────────

export function PresetPreview({
  layout,
  kleur = "#f2f2ec",
  glas = "hr-plus",
}: {
  layout: Cell;
  kleur?: string;
  glas?: string;
}) {
  const W = 300, H = 230;
  const pad = 14;
  const x0 = pad, y0 = pad;
  const w = W - 2 * pad, h = H - 2 * pad;
  const f = 10; // buitenkozijn-dikte

  const frameColor = kleur;
  const frameDark = shade(frameColor, -0.35);
  const gradId = "preset-glass";
  const glassTop = glas === "triple" ? "#d2e4e2" : "#dbe7ee";
  const glassBottom = glas === "triple" ? "#bcd4cf" : "#c4d9e3";

  const ctx: Ctx = { frameColor, frameDark, gradId };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label="Schematische tekening van de kozijnsamenstelling"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={glassTop} />
          <stop offset="100%" stopColor={glassBottom} />
        </linearGradient>
      </defs>

      {/* Buitenkozijn */}
      <rect x={x0} y={y0} width={w} height={h} fill={frameColor} stroke={frameDark} strokeWidth={1} />
      {/* Inhoud */}
      {drawCell(layout, x0 + f, y0 + f, w - 2 * f, h - 2 * f, ctx, "root")}
    </svg>
  );
}
