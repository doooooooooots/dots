export default function makeSortFunc({ multiple, value, options }) {
  return (a, b) => {
    if (multiple) {
      // Display the selected labels first.
      let ai = value.indexOf(a);
      ai = ai === -1 ? value.length + options.indexOf(a) : ai;
      let bi = value.indexOf(b);
      bi = bi === -1 ? value.length + options.indexOf(b) : bi;
      return ai - bi;
    } else {
      let ai = value === a;
      let bi = value === b;
      ai = !ai ? 1 + options.indexOf(a) : 0;
      bi = !bi ? 1 + options.indexOf(b) : 0;
      return ai - bi;
    }
  };
}
