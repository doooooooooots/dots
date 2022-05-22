import PropTypes from 'prop-types';
import React from 'react';
import { useLocalObservable } from 'mobx-react';
import createStore from '../../store';

const storeContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(createStore);
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};

StoreProvider.propTypes = {
  children: PropTypes.any,
};
