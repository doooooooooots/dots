import { isEmpty } from 'lodash';
import BaseEnumConfig from '../types/enum';
import LangType from '../types/lang';

type OptionType<T> = {
  key: T;
  value: number;
  index: number;
  label: string;
  color?: string;
};

/**
 * EnumList
 * Formats an Enum and supercharge it with getters
 */
export default function enumList<T extends string, U>(
  defObj: BaseEnumConfig<T, U>
) {
  const { values, labels, colors, helpers } = defObj;

  // Extract datas form values list
  const { valuesIndexed, options, minValue, maxValue } = (
    Object.entries(values) as [T, number][]
  ).reduce(
    (acc, [key, value], index) => {
      /**
       * Create enum option
       */
      const option: OptionType<T> = {
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

      /**
       * Create object indexes by stringified value
       */
      acc.valuesIndexed = { ...acc.valuesIndexed, [`${value}`]: key };

      /**
       * Extract min value
       */
      if (acc.minValue === 0 || acc.minValue > value) {
        acc.minValue = value;
      }

      /**
       * Extract max value
       */
      if (acc.maxValue === 0 || acc.maxValue < value) {
        acc.maxValue = value;
      }

      return acc;
    },
    {
      valuesIndexed: {} as { [key: string]: T },
      options: [] as OptionType<T>[],
      minValue: 0,
      maxValue: 0,
    }
  );

  const getTokenFromValue = (value: number) => valuesIndexed[`${value}`];

  return Object.freeze({
    values: values,
    labels,
    colors,
    getTokenFromValue,
    has: (value: number) => Object.values(values).includes(value),
    getOptions: () => options,
    getValues: () => values,
    getMinValue: () => minValue,
    getMaxValue: () => maxValue,
    getOptionsLength: () => options.length,
    getLabelFromValue: (value: number, lang: LangType = 'fr') =>
      (labels && labels[lang][getTokenFromValue(value)]) || '',
    ...(helpers ?? null),
  });
}
