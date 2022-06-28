type GetterFuncType<T extends string> = (field: {
  [key in T]: unknown;
}) => string;

export interface FilterAttributesType<U extends string> {
  name: string;
  query: Record<number, U>;
  filterAttributes: Record<number, U>;
  getters: {
    primary: GetterFuncType<U>;
    secondary?: GetterFuncType<U>;
    info?: GetterFuncType<U>;
  };
}

export interface EntityConfig<U> {
  singular: string;
  fields: U;
  filters?: {
    default: FilterAttributesType<Extract<keyof U, string>>;
    [key: string]: FilterAttributesType<Extract<keyof U, string>>;
  };
  form?: {
    [key: string]: unknown;
  };
  fragments?: {
    default: string;
    [key: string]: string;
  };
}

export default EntityConfig;
