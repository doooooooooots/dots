import { isEmpty } from 'lodash';
import { BaseEnumConfig } from '../../_trash/types/enum';

type OptionType = {
  key: string;
  value: number;
  index: number;
  label: string;
  color?: string;
};

export default function enumList<T extends string, U>(
  defObj: BaseEnumConfig<T, U>
) {
  const { values, labels, colors, helpers } = defObj;

  const { valuesIndexed, options, minValue, maxValue } = Object.entries<number>(
    values
  ).reduce(
    (acc, [key, value], index) => {
      // Create option
      const option: OptionType = {
        key,
        value,
        label: '',
        index: index + 1,
      };
      if (labels && !isEmpty(labels)) {
        option.label = labels.fr[key];
      }
      if (colors && !isEmpty(colors)) {
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
      options: [] as OptionType[],
      minValue: 0,
      maxValue: 0,
    }
  );

  const getTokenFromValue = (value: number) => valuesIndexed[`${value}`];

  return Object.freeze({
    values,
    labels,
    colors,
    getTokenFromValue,
    has: (value: number) => Object.values(values).includes(value),
    getOptions: () => options,
    getValues: () => values,
    getMinValue: () => minValue,
    getMaxValue: () => maxValue,
    getOptionsLength: () => options.length,
    getLabelFromValue: (value: number, lang = 'fr') =>
      (labels && labels[lang][getTokenFromValue(value)]) || '',
    ...(helpers ?? null),
  });
}