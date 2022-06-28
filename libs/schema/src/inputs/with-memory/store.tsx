/* eslint-disable @typescript-eslint/no-explicit-any */

export const createFormAction = (globalState: any, id: string | number) => {
  //-> if object already exist, don't create it
  if (id in globalState) return globalState;
  //-> else create new object
  return {
    ...globalState,
    [id]: {},
  };
};

export const setFormAction = (globalState: any, { id, data }: any) => {
  //-> if object doesn't exist, don't create it
  if (!(id in globalState)) return globalState;
  //-> replace data by user ones
  return {
    ...globalState,
    [id]: data,
  };
};

export const updateFormAction = (globalState: any, { id, data }: any) => {
  //-> if object doesn't exist, don't create it
  if (!(id in globalState)) return globalState;
  //-> else add data to existing object
  return {
    ...globalState,
    [id]: {
      ...globalState[id],
      ...data,
    },
  };
};

export const deleteFormAction = (globalState: any, payload: string) => {
  //-> copy object to prevent mutability error
  const newState = { ...globalState };
  delete newState[payload];
  return newState;
};

export const clearAllAction = () => {
  return {};
};
