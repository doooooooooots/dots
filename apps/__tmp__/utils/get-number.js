export function getNumber(number) {
  let input = parseInt(number, 10);
  if (isNaN(input)) {
    return null;
  }
  return input;
}

export function getNumberText(number) {
  if (!number) return;
  let input = parseInt(number, 10);
  if (isNaN(input)) {
    return number.toUpperCase();
  }
  return null;
}
