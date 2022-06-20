import { toCamelCase } from 'js-convert-case';

function enums(enumLists) {
  return Object.entries(enumLists).reduce(
    (acc, [EnumName, { values, colors = {}, ...other }]) => ({
      ...acc,
      [EnumName]: {
        values,
        colors,
        tokens: Object.keys(values).map(
          (key) => `enum.${toCamelCase(EnumName)}.${toCamelCase(key)}`
        ),
        ...other,
      },
    }),
    {}
  );
}

export default enums;
