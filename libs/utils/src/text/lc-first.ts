export default function lcFirst(str: string): string {
  if (str.length > 0) {
    return str[0].toLowerCase() + str.substring(1);
  }
  return str;
}
