export default function filterObject(obj: object, callback: Function) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(val, key))
  );
}
