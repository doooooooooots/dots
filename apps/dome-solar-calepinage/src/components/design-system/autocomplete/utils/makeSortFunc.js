export default function makeSortFunc({ value, options }) {
  return (a, b) => {
    // Display the selected labels first.
    let ai = value.indexOf(a);
    ai = ai === -1 ? value.length + options.indexOf(a) : ai;
    let bi = value.indexOf(b);
    bi = bi === -1 ? value.length + options.indexOf(b) : bi;
    return ai - bi;
  };
}
