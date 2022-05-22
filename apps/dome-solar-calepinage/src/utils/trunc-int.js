export function getIndexTrunc(index, value) {
  if (index < 0) return value;
  return Math.trunc(index);
}
