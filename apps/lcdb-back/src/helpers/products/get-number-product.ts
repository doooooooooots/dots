export default function getNumberProduct(item) {
  if (![false, null, '', undefined].includes(item.number)) {
    return `000${item.number}`.slice(-3);
  }
  return '000';
}