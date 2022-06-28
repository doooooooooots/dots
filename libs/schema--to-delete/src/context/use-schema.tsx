import { createContext, useContext } from 'react';
import { ucFirst } from '@dots.cool/utils';

// [ ](Adrien): Manage cache system :
// - init with local storage
// - fetch keys to delete
// - delete keys to update from cache
// - when unmount save cache in local storage

export const DotsContext = createContext({});

export const useDots = () => {
  const store = useContext(DotsContext);
  if (!store) {
    throw new Error('useLogic must be used within a Provider.');
  }
  return store;
};

export const DotsSchemaProvider = (props) => {
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
};
