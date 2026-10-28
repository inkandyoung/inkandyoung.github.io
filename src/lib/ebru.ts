/**
 * The marbled (ebru) pattern behind every cover, generated from an issue's
 * palette and seed. The same issue always produces the same sheet.
 */
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function ebruPattern(palette: string[], seed: number, number: number) {
  const [ground, ...paints] = palette;
  const rand = mulberry32(seed * 9973 + number);
  const bands: { y: number; h: number; fill: string }[] = [];
  for (let y = -60; y < 460; ) {
    const h = 8 + Math.round(rand() * 52);
    bands.push({ y, h, fill: paints[Math.floor(rand() * paints.length)] });
    y += h + 6 + Math.round(rand() * 26);
  }
  const drops = Array.from({ length: 3 + Math.floor(rand() * 3) }, () => ({
    cx: Math.round(20 + rand() * 260),
    cy: Math.round(40 + rand() * 320),
    r: Math.round(14 + rand() * 34),
    fill: paints[Math.floor(rand() * paints.length)],
  }));
  const freq = (0.005 + rand() * 0.003).toFixed(4);
  const comb = (0.016 + rand() * 0.01).toFixed(4);
  return { ground, bands, drops, freq, comb };
}

// Astro renders components in order, so a counter keeps filter ids unique per page.
export function ebruId(number: number) {
  const g = globalThis as { __ebruCount?: number };
  g.__ebruCount = (g.__ebruCount ?? 0) + 1;
  return `ebru-${number}-${g.__ebruCount}`;
}
