import { createContext, useContext } from 'react';
import { ucFirst } from '@dots.cool/utils';
import { GraphQlApiType } from '../create-graphql-api';
import { BaseFieldConfig } from '../types/field';
import { FilterAttributesType } from '../types/entity';

// [ ](Adrien): Manage cache system :
// - init with local storage
// - fetch keys to delete
// - delete keys to update from cache
// - when unmount save cache in local storage

interface DotsSchemaType<U extends string> {
  singular: string;
  graphql: GraphQlApiType;
  fields: {
    [key: string]: BaseFieldConfig;
  };
  filters: FilterAttributesType<U>;
  forms: any;
  fragments: any;
}

type DotsSchemaContextType<U extends string> = DotsSchemaType<U> & {
  getSchema: (entityName: string) => DotsSchemaType<U>;
};

export const DotsContext = createContext({} as DotsSchemaContextType<any>);

export const useDots = () => {
  const store = useContext(DotsContext);
  if (!store) {
    throw new Error('useDots must be used within a Provider.');
  }
  return store;
};

export function DotsSchemaProvider<T extends string, U>(props: {
  schema: {
    [key in T]: U;
  };
  children: React.ReactNode;
}) {
  const { schema, children } = props;

  return (
    <DotsContext.Provider
      value={{
        ...schema,
        getSchema: (entityName: string) => schema[ucFirst(entityName) as T],
      }}
    >
      {children}
    </DotsContext.Provider>
  );
}
