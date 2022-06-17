// interface EnumDefinitionType {
//   name: string;
//   values: {
//     [key: string]: number | string;
//   };
//   min?: string;
//   max?: string;
//   labels: {
//     [lang: string]: {
//       [key: string]: string;
//     };
//   };
// }

export default function enumList(defObj) {
  const { values, min, max, labels } = defObj;

  const valuesIndexed = Object.entries(values).reduce(
    (acc, [key, value]) => ({ ...acc, [`${value}`]: key }),
    {}
  );

  const getTokenFromValue = (value) => valuesIndexed[`${value}`];

  return Object.freeze({
    ...defObj,
    getTokenFromValue,
    getLabelFromValue: (value, lang = 'fr') =>
      labels[lang][getTokenFromValue(`${value}`)],
    getMinValue: () => values[min],
    getMaxValue: () => values[max],
  });
}
