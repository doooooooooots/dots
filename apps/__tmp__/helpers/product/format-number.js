export default function formatNumber (number) {
  return `000${number}`.slice(-3);
}