import LangType from './lang';

type EnumTypes = 'category' | 'scale' | 'progress' | 'values';

export default interface BaseEnumConfig<T extends string, U> {
  type: EnumTypes;
  values: { [key in T]: number };
  labels?: { [lang in LangType]: { [key in T]: string } };
  colors?: { [key in T]: string };
  helpers?: U;
}
