export default function isNullOrEmptyArray(item:any[]):boolean {
  return !((Array.isArray(item) && !item.length) || item === null);
}
