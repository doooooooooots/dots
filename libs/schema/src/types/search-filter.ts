type GetterFuncType<T extends string> = (field: {
  [key in T]: unknown;
}) => string;

export interface SearchFilterAttributesType<T extends string> {
  name: string;
  query: Record<number, T> | string;
  filterAttributes: Record<number, T>;
  getters: {
    primary: GetterFuncType<T>;
    secondary?: GetterFuncType<T>;
    info?: GetterFuncType<T>;
  };
}
