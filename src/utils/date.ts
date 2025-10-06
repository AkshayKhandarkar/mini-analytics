export function toYMD(d: Date) {
  return d.toISOString().slice(0, 10);
}
export function inRange(
  dateStr: string,
  from?: string | null,
  to?: string | null
) {
  const t = new Date(dateStr).getTime();
  if (from) {
    const f = new Date(from).getTime();
    if (t < f) return false;
  }
  if (to) {
    const T = new Date(to).getTime();
    if (t > T) return false;
  }
  return true;
}
