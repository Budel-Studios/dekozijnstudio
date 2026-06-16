import { PROFIEL_DIKTE, CONFIG_KLEUREN } from "@/data/configurator";
import type { KozijnConfig } from "@/lib/configurator-price";

/**
 * Live technische tekening (SVG) van het geconfigureerde kozijn.
 * Reflecteert: producttype (indeling + opening-symbolen), materiaal
 * (profieldikte), afmetingen (verhouding + maatlijnen) en kleur (profielkleur).
 * Bewust schematisch in 2D-aanzicht, vergelijkbaar met technische kozijntekeningen.
 */

// ─── Kleurhulp ────────────────────────────────────────────────────────────────

function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

/** Maakt een kleur donkerder (amount < 0) of lichter (amount > 0). */
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

// ─── Hoofdcomponent ──────────────────────────────────────────────────────────

export function KozijnPreview({ config }: { config: KozijnConfig }) {
  const frameColor =
    CONFIG_KLEUREN.find((k) => k.value === config.kleur)?.hex ?? "#f2f2ec";
  const frameDark = shade(frameColor, -0.35);
  const frameLight = shade(frameColor, 0.25);

  // Glaskleur afhankelijk van glastype
  const glasType = config.glas ?? "hr-plus";
  const glassTop = glasType === "triple" ? "#d2e4e2" : "#dbe7ee";
  const glassBottom = glasType === "triple" ? "#bcd4cf" : "#c4d9e3";

  // ── Layout: schaal echte cm naar SVG-units met behoud van verhouding ──
  const maxW = 300;
  const maxH = 260;
  const bw = Math.max(30, config.breedteCm || 100);
  const bh = Math.max(30, config.hoogteCm || 120);
  const ratio = bw / bh;
  let w = maxW;
  let h = maxW / ratio;
  if (h > maxH) {
    h = maxH;
    w = maxH * ratio;
  }
  if (w > maxW) {
    w = maxW;
    h = maxW / ratio;
  }

  // Profieldikte (frame) op basis van materiaal
  const dikteFactor = config.materiaal ? PROFIEL_DIKTE[config.materiaal] ?? 0.07 : 0.07;
  const f = Math.max(7, Math.min(w, h) * dikteFactor);

  // Marges voor maatlijnen
  const mL = 46; // links: hoogtemaat
  const mT = 14;
  const mR = 14;
  const mB = 40; // onder: breedtemaat
  const x0 = mL;
  const y0 = mT;
  const svgW = mL + w + mR;
  const svgH = mT + h + mB;

  const gradId = "glass-grad";

  // Inner opening (binnenkant van het buitenkozijn)
  const ox = x0 + f;
  const oy = y0 + f;
  const ow = w - 2 * f;
  const oh = h - 2 * f;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Tekening van het geconfigureerde kozijn: ${config.breedteCm} bij ${config.hoogteCm} centimeter`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={glassTop} />
          <stop offset="100%" stopColor={glassBottom} />
        </linearGradient>
      </defs>

      {/* Buitenkozijn */}
      <rect x={x0} y={y0} width={w} height={h} rx={2} fill={frameColor} stroke={frameDark} strokeWidth={1} />
      {/* Lichtrand binnenzijde profiel (3D-hint) */}
      <rect x={x0 + 1.5} y={y0 + 1.5} width={w - 3} height={h - 3} rx={2} fill="none" stroke={frameLight} strokeWidth={0.75} opacity={0.6} />

      {/* Inhoud per producttype */}
      <ProductContent
        type={config.producttype}
        ox={ox}
        oy={oy}
        ow={ow}
        oh={oh}
        f={f}
        frameColor={frameColor}
        frameDark={frameDark}
        gradId={gradId}
      />

      {/* Maatlijnen */}
      <DimLines x0={x0} y0={y0} w={w} h={h} breedteCm={config.breedteCm} hoogteCm={config.hoogteCm} />
    </svg>
  );
}

// ─── Producttype-inhoud ──────────────────────────────────────────────────────

type ContentProps = {
  type?: string;
  ox: number;
  oy: number;
  ow: number;
  oh: number;
  f: number;
  frameColor: string;
  frameDark: string;
  gradId: string;
};

function Glass({ x, y, w, h, gradId }: { x: number; y: number; w: number; h: number; gradId: string }) {
  if (w <= 0 || h <= 0) return null;
  return <rect x={x} y={y} width={w} height={h} fill={`url(#${gradId})`} stroke="#9fb4bd" strokeWidth={0.5} />;
}

function ProductContent(props: ContentProps) {
  const { type, ox, oy, ow, oh, f, frameColor, frameDark, gradId } = props;

  // Vast raam — alleen glas
  if (!type || type === "vast-raam") {
    return <Glass x={ox} y={oy} w={ow} h={oh} gradId={gradId} />;
  }

  // Draaikiep — vleugel (sash) + draai/kiep-symbool + greep
  if (type === "draaikiep") {
    const sw = Math.max(5, f * 0.7); // vleugeldikte
    const gx = ox + sw;
    const gy = oy + sw;
    const gw = ow - 2 * sw;
    const gh = oh - 2 * sw;
    const handleH = Math.max(10, oh * 0.12);
    return (
      <>
        {/* vleugelprofiel */}
        <rect x={ox} y={oy} width={ow} height={oh} fill={frameColor} stroke={frameDark} strokeWidth={0.75} />
        <Glass x={gx} y={gy} w={gw} h={gh} gradId={gradId} />
        {/* draai-symbool (scharnier links): apex links */}
        <polyline points={`${gx + gw},${gy} ${gx},${gy + gh / 2} ${gx + gw},${gy + gh}`} fill="none" stroke="#5b6b73" strokeWidth={0.9} strokeDasharray="4 3" />
        {/* kiep-symbool (scharnier onder): apex onder */}
        <polyline points={`${gx},${gy} ${gx + gw / 2},${gy + gh} ${gx + gw},${gy}`} fill="none" stroke="#5b6b73" strokeWidth={0.9} strokeDasharray="4 3" />
        {/* greep rechts */}
        <rect x={ox - 2.5} y={oy + oh / 2 - handleH / 2} width={3} height={handleH} rx={1.5} fill={frameDark} />
      </>
    );
  }

  // Valraam — kantelt aan de onderzijde (kiep-symbool, apex onder)
  if (type === "valraam") {
    const sw = Math.max(5, f * 0.7);
    const gx = ox + sw;
    const gy = oy + sw;
    const gw = ow - 2 * sw;
    const gh = oh - 2 * sw;
    const handleW = Math.max(10, ow * 0.12);
    return (
      <>
        <rect x={ox} y={oy} width={ow} height={oh} fill={frameColor} stroke={frameDark} strokeWidth={0.75} />
        <Glass x={gx} y={gy} w={gw} h={gh} gradId={gradId} />
        {/* kiep-symbool: apex onder-midden */}
        <polyline points={`${gx},${gy} ${gx + gw / 2},${gy + gh} ${gx + gw},${gy}`} fill="none" stroke="#5b6b73" strokeWidth={0.9} strokeDasharray="4 3" />
        {/* greep boven-midden */}
        <rect x={ox + ow / 2 - handleW / 2} y={oy - 2.5} width={handleW} height={3} rx={1.5} fill={frameDark} />
      </>
    );
  }

  // Tuindeuren — twee openslaande deuren, greep in het midden
  if (type === "tuindeur") {
    const mid = f * 0.8;
    const leafW = (ow - mid) / 2;
    const sw = Math.max(4, f * 0.55);
    const handleH = Math.max(14, oh * 0.16);
    const leaf = (lx: number, handleRight: boolean) => (
      <>
        <rect x={lx} y={oy} width={leafW} height={oh} fill={frameColor} stroke={frameDark} strokeWidth={0.6} />
        <Glass x={lx + sw} y={oy + sw} w={leafW - 2 * sw} h={oh - 2 * sw} gradId={gradId} />
        <rect
          x={handleRight ? lx + leafW - 4 : lx + 1.5}
          y={oy + oh / 2 - handleH / 2}
          width={2.5}
          height={handleH}
          rx={1.25}
          fill="#9aa0a3"
        />
      </>
    );
    return (
      <>
        {leaf(ox, true)}
        {leaf(ox + leafW + mid, false)}
      </>
    );
  }

  // Voordeur — bovenglas + onderpaneel + greep
  if (type === "voordeur") {
    const glasH = oh * 0.38;
    const paneelY = oy + glasH + f * 0.5;
    const paneelH = oh - glasH - f * 0.5;
    const paneelColor = frameDark;
    const handleH = Math.max(14, oh * 0.16);
    return (
      <>
        <Glass x={ox} y={oy} w={ow} h={glasH} gradId={gradId} />
        {/* deurpaneel */}
        <rect x={ox} y={paneelY} width={ow} height={paneelH} fill={paneelColor} stroke={frameDark} strokeWidth={0.5} />
        <rect x={ox + ow * 0.18} y={paneelY + paneelH * 0.12} width={ow * 0.64} height={paneelH * 0.74} rx={2} fill="none" stroke={frameColor} strokeWidth={1} opacity={0.5} />
        {/* greep links */}
        <rect x={ox + 4} y={oy + oh * 0.52 - handleH / 2} width={3.5} height={handleH} rx={1.75} fill="#9aa0a3" />
      </>
    );
  }

  // Achterdeur — groter glasdeel + onderpaneel
  if (type === "achterdeur") {
    const glasH = oh * 0.58;
    const paneelY = oy + glasH + f * 0.5;
    const paneelH = oh - glasH - f * 0.5;
    const handleH = Math.max(14, oh * 0.16);
    return (
      <>
        <Glass x={ox} y={oy} w={ow} h={glasH} gradId={gradId} />
        <rect x={ox} y={paneelY} width={ow} height={paneelH} fill={frameDark} stroke={frameDark} strokeWidth={0.5} />
        <rect x={ox + 4} y={oy + oh * 0.5 - handleH / 2} width={3.5} height={handleH} rx={1.75} fill="#9aa0a3" />
      </>
    );
  }

  // Schuifpui — 2 panelen, middenstijl, schuifpijl
  if (type === "schuifpui") {
    const mid = f; // middenstijl-dikte
    const panelW = (ow - mid) / 2;
    const cx = ox + panelW + mid / 2;
    return (
      <>
        <Glass x={ox} y={oy} w={panelW} h={oh} gradId={gradId} />
        <Glass x={ox + panelW + mid} y={oy} w={panelW} h={oh} gradId={gradId} />
        {/* middenstijl */}
        <rect x={ox + panelW} y={oy} width={mid} height={oh} fill={frameColor} stroke={frameDark} strokeWidth={0.5} />
        {/* schuifpijl */}
        <g stroke="#5b6b73" strokeWidth={1} fill="none">
          <line x1={cx - 16} y1={oy + oh / 2} x2={cx + 16} y2={oy + oh / 2} />
          <polyline points={`${cx + 11},${oy + oh / 2 - 4} ${cx + 16},${oy + oh / 2} ${cx + 11},${oy + oh / 2 + 4}`} />
          <polyline points={`${cx - 11},${oy + oh / 2 - 4} ${cx - 16},${oy + oh / 2} ${cx - 11},${oy + oh / 2 + 4}`} />
        </g>
      </>
    );
  }

  // Vouwwand — 3 panelen + vouwindicatie
  if (type === "vouwwand") {
    const panels = 3;
    const mid = Math.max(3, f * 0.6);
    const panelW = (ow - mid * (panels - 1)) / panels;
    const items = [];
    for (let i = 0; i < panels; i++) {
      const px = ox + i * (panelW + mid);
      items.push(<Glass key={`g${i}`} x={px} y={oy} w={panelW} h={oh} gradId={gradId} />);
      if (i < panels - 1) {
        items.push(
          <rect key={`m${i}`} x={px + panelW} y={oy} width={mid} height={oh} fill={frameColor} stroke={frameDark} strokeWidth={0.4} />,
        );
      }
    }
    return (
      <>
        {items}
        {/* vouwpijlen boven */}
        <g stroke="#5b6b73" strokeWidth={0.9} fill="none">
          <polyline points={`${ox + panelW * 0.5},${oy + 8} ${ox + panelW},${oy + 4} ${ox + panelW * 1.5 + mid},${oy + 8}`} strokeDasharray="3 2" />
        </g>
      </>
    );
  }

  return <Glass x={ox} y={oy} w={ow} h={oh} gradId={gradId} />;
}

// ─── Maatlijnen ──────────────────────────────────────────────────────────────

function DimLines({
  x0,
  y0,
  w,
  h,
  breedteCm,
  hoogteCm,
}: {
  x0: number;
  y0: number;
  w: number;
  h: number;
  breedteCm: number;
  hoogteCm: number;
}) {
  const tick = 4;
  const stroke = "#9a958c";
  const wy = y0 + h + 22; // breedtemaat onder
  const hx = x0 - 24; // hoogtemaat links
  return (
    <g stroke={stroke} strokeWidth={0.75} fill="none">
      {/* Breedte (onder) */}
      <line x1={x0} y1={wy} x2={x0 + w} y2={wy} />
      <line x1={x0} y1={wy - tick} x2={x0} y2={wy + tick} />
      <line x1={x0 + w} y1={wy - tick} x2={x0 + w} y2={wy + tick} />
      <text x={x0 + w / 2} y={wy + 13} textAnchor="middle" fontSize="11" fill="#6b6660" stroke="none" fontFamily="sans-serif">
        {breedteCm} cm
      </text>

      {/* Hoogte (links) */}
      <line x1={hx} y1={y0} x2={hx} y2={y0 + h} />
      <line x1={hx - tick} y1={y0} x2={hx + tick} y2={y0} />
      <line x1={hx - tick} y1={y0 + h} x2={hx + tick} y2={y0 + h} />
      <text
        x={hx - 8}
        y={y0 + h / 2}
        textAnchor="middle"
        fontSize="11"
        fill="#6b6660"
        stroke="none"
        fontFamily="sans-serif"
        transform={`rotate(-90 ${hx - 8} ${y0 + h / 2})`}
      >
        {hoogteCm} cm
      </text>
    </g>
  );
}
