import { createContext, useContext } from 'react';

export const DotsContext = createContext({});

export const useDots = () => {
  const store = useContext(DotsContext);
  if (!store) {
    throw new Error('useLogic must be used within a Provider.');
  }
  return store;
};

export const DotsProvider = (props) => {
  const { schema, children } = props;

  return <DotsContext.Provider value={schema}>{children}</DotsContext.Provider>;
};
