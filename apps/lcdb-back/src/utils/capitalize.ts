export default function capitalize(string: String): String {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1);
}