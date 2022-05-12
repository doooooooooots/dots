const createFormAction = (globalState, { id, initialValues = {} }) => {
  return {
    ...globalState,
    [id]: initialValues
  };
};

const deleteFormAction = (globalState, payload) => {
  const newState = { ...globalState };
  delete newState[payload];
  return newState;
};

const getFormAction = (globalState, { id }) => {
  return globalState[id];
};

const setFormAction = (globalState, { id, data }) => {
  return {
    ...globalState,
    [id]: data
  };
};

const updateFormAction = (globalState, { id, data }) => {
  return {
    ...globalState,
    [id]: {
      ...globalState[id],
      ...data
    }
  };
};

export { createFormAction, deleteFormAction, getFormAction, setFormAction, updateFormAction };
