export default function differenceSet(setA, setB) {
  // eslint-disable-next-line no-undef
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}
