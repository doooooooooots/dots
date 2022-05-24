export default function stringToInt(string) {
  if (string) {
    return parseInt(
      parseInt(string.replaceAll(' ', '').substring(0, 25), 36).toString()[0],
      10
    );
  }
  return 0;
}
