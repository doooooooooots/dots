type EnumTypes = 'category' | 'scale' | 'progress' | 'values';

export interface BaseEnumConfig<T extends string> {
  type: EnumTypes;
  values: { [key in T]: number };
  labels?: { [lang: string]: { [key in T]: string } };
  colors?: { [key in T]: string };
}
