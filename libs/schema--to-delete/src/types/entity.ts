type GetterFuncType<T extends string> = (field: {
  [key in T]: unknown;
}) => string;

interface FilterAttributesType<U extends string> {
  name: string;
  query: Record<number, U>;
  filterAttributes: Record<number, U>;
  getters: {
    primary: GetterFuncType<U>;
    secondary?: GetterFuncType<U>;
    info?: GetterFuncType<U>;
  };
}

export default interface EntityConfig<U> {
  singular: string;
  fields: U;
  filters?: {
    default: FilterAttributesType<Extract<keyof U, string>>;
    [key: string]: FilterAttributesType<Extract<keyof U, string>>;
  };
  templates?: {
    [key: string]: unknown;
  };
  form?: {
    [key: string]: unknown;
  };
}
