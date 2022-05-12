export default function formatNumber(
  number: number,
  length = 3,
  placeholder = 0
) {
  const minLengthString = new Array(length).fill(placeholder);
  return `${minLengthString}${number}`.slice(-length);
}
