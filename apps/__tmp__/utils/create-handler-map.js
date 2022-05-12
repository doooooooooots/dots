export default function createHandlerMap({ actions }) {
  return {
    setValue: (key, value) => (dispatch) => {
      dispatch(actions.setValue({ key, value }));
    },
    setAll: (newState) => (dispatch) => {
      dispatch(actions.set(newState));
    },
    reset: () => (dispatch) => {
      dispatch(actions.reset());
    },
    updateValue: (key, values) => (dispatch) => {
      dispatch(actions.mergeValue({ key, values }));
    },
    toggle: (key) => (dispatch) => {
      dispatch(actions.toggle(key));
    }
  };
}
