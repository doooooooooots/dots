import { toCamelCase } from 'js-convert-case';
import enumList from './enum-list';

type EnumListType = Record<string, typeof enumList>;

function formatEnums(enumLists: EnumListType) {
  return Object.entries(enumLists).reduce((acc, [EnumName, value]) => {
    const { values, colors, ...other } = value;
    return {
      ...acc,
      [EnumName]: {
        values,
        colors,
        tokens: Object.keys(values).map(
          (key) => `enum.${toCamelCase(EnumName)}.${toCamelCase(key)}`
        ),
        ...other,
      },
    };
  }, {});
}

export default formatEnums;
