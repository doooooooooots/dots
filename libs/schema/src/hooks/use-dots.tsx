import { createContext, useContext } from 'react';
import { ucFirst } from '@dots.cool/utils';
import { EntitySchema } from '../types/entity';

// [ ](Adrien): Manage cache system :
// - init with local storage
// - fetch keys to delete
// - delete keys to update from cache
// - when unmount save cache in local storage

type ListOfSchemas = Record<string, EntitySchema<string>>;

type DotsSchemaType<U extends string> = {
  getSchema: (entityName: string) => EntitySchema<U>;
};

export const DotsContext = createContext({});

export function useDots<T extends string>() {
  const store = useContext(DotsContext);
  if (!store) {
    throw new Error('useDots must be used within a Provider.');
  }
  return store as DotsSchemaType<T>;
}

export function DotsSchemaProvider(props: {
  schema: ListOfSchemas;
  children: React.ReactNode;
}) {
  const { schema, children } = props;

  return (
    <DotsContext.Provider
      value={{
        ...schema,
        getSchema: (entityName: string) => schema[ucFirst(entityName)],
      }}
    >
      {children}
    </DotsContext.Provider>
  );
}
