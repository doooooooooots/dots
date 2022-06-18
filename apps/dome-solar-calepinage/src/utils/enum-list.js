// FIXME: TS INTERFACE
import { isEmpty } from 'lodash';
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

const createGetTokenFromValue = (values) => (value, lang) => {
  const valuesIndexed = Object.entries(values).reduce(
    (acc, [key, value]) => ({ ...acc, [`${value}`]: key }),
    {}
  );
  return valuesIndexed[`${value}`];
};

export default function enumList(defObj) {
  const { values, min, max, labels, colors } = defObj;

  const getTokenFromValue = createGetTokenFromValue(values);
  const options = Object.entries(values).map(([key, value], index) => {
    const output = {
      key,
      value,
      label: labels.fr[key],
      index: index + 1,
    };

    if (!isEmpty(colors)) {
      output.color = colors[key];
    }

    return output;
  });

  return Object.freeze({
    ...defObj,
    getTokenFromValue,
    getLabelFromValue: (value, lang = 'fr') =>
      labels[lang][getTokenFromValue(`${value}`)],
    getOptions: () => options,
    getMinValue: () => values[min],
    getMaxValue: () => values[max],
  });
}
