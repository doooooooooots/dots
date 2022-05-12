/* eslint-disable @typescript-eslint/no-explicit-any */

export const deleteFormAction = (globalState: any, payload: any) => {
  const newState = { ...globalState };
  delete newState[payload];
  return newState;
};

export const setFormAction = (globalState: any, { id, data }: any) => {
  return {
    ...globalState,
    [id]: data,
  };
};

export const updateFormAction = (globalState: any, { id, data }: any) => {
  return {
    ...globalState,
    [id]: {
      ...globalState[id],
      ...data,
    },
  };
};

export const clearAllAction = () => {
  return {};
};
