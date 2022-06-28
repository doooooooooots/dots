export const createFormAction = (globalState, { id, initialValues = {} }) => {
  return {
    ...globalState,
    [id]: initialValues,
  };
};

export const getFormAction = (globalState, { id }) => {
  return globalState[id];
};

export const updateFormAction = (globalState, { id, data }) => {
  return {
    ...globalState,
    [id]: {
      ...globalState[id],
      ...data,
    },
  };
};

export const setFormAction = (globalState, { id, data }) => {
  return {
    ...globalState,
    [id]: data,
  };
};

export const deleteFormAction = (globalState, payload) => {
  const newState = { ...globalState };
  delete newState[payload];
  return newState;
};
