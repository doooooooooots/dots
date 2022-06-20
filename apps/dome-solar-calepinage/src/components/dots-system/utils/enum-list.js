import { isEmpty } from 'lodash';

export default function enumList(defObj) {
  const { values, labels, colors } = defObj;

  const { valuesIndexed, options, minValue, maxValue } = Object.entries(
    values
  ).reduce(
    (acc, [key, value], index) => {
      // Create option
      const option = {
        key,
        value,
        label: labels.fr[key],
        index: index + 1,
      };
      if (!isEmpty(colors)) {
        option.color = colors[key];
      }
      acc.options.push(option);

      // Create object indexes by stringified value
      acc.valuesIndexed = { ...acc.valuesIndexed, [`${value}`]: key };

      if (acc.minValue === 0 || acc.minValue > value) {
        acc.minValue = value;
      }

      if (acc.maxValue === 0 || acc.maxValue < value) {
        acc.maxValue = value;
      }

      return acc;
    },
    {
      valuesIndexed: {},
      options: [],
      minValue: 0,
      maxValue: 0,
    }
  );

  const getTokenFromValue = (value) => valuesIndexed[`${value}`];

  return Object.freeze({
    ...defObj,
    getTokenFromValue,
    getLabelFromValue: (value, lang = 'fr') =>
      labels[lang][getTokenFromValue(`${value}`)],
    getOptions: () => options,
    getMinValue: () => minValue,
    getMaxValue: () => maxValue,
    getOptionsLength: () => options.length,
  });
}
