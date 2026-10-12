export const MAX = 100000000 // keeps cents below JS's safe-integer limit
export const clamp = (v, max = MAX) => Math.min(Math.max(parseFloat(v) || 0, 0), max)
export const lim = (v, max = MAX) => {
  if (v === '') return v
  const s = String(v).replace(/^0+(?=\d)/, '').slice(0, 12) // no leading-zero strings, capped length
  const n = parseFloat(s)
  return n > max ? String(max) : n < 0 ? '0' : s
}
export const toC = v => Math.round(clamp(v) * 100)
export const fmt = (c, cur = 'USD') =>
  (c / 100).toLocaleString(undefined, { style: 'currency', currency: cur })

// Largest-remainder split: shares always add up to the exact total, to the cent.
export function allocate(total, weights) {
  const sum = weights.reduce((a, b) => a + b, 0)
  if (!sum || total <= 0) return weights.map(() => 0)
  const raw = weights.map(w => (total * w) / sum)
  const out = raw.map(Math.floor)
  const left = total - out.reduce((a, b) => a + b, 0)
  raw.map((r, i) => [r - out[i], i]).sort((a, b) => b[0] - a[0])
    .slice(0, left).forEach(([, i]) => out[i]++)
  return out
}

// Fewest transfers to settle balances (positive = is owed money).
export function settle(bal) {
  const cr = [], de = []
  Object.entries(bal).forEach(([n, v]) => v > 0 ? cr.push([n, v]) : v < 0 && de.push([n, -v]))
  cr.sort((a, b) => b[1] - a[1]); de.sort((a, b) => b[1] - a[1])
  const t = []; let i = 0, j = 0
  while (i < cr.length && j < de.length) {
    const x = Math.min(cr[i][1], de[j][1])
    t.push({ from: de[j][0], to: cr[i][0], amt: x })
    cr[i][1] -= x; de[j][1] -= x
    if (!cr[i][1]) i++
    if (!de[j][1]) j++
  }
  return t
}