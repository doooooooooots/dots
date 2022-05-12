export default function differenceSet(setA, setB) {
  // eslint-disable-next-line no-undef
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}
