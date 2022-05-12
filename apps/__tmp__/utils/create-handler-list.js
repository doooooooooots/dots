import capitalizeFirstLetter from './capitalize-first-letter';

export default function createHandlerList({ actions }) {
  return {
    load: (input) => (dispatch) => {
      dispatch(actions.getMultiple(input));
    },
    resetList: () => (dispatch) => {
      dispatch(actions.resetList());
    },
    get:
      (input, type = 'get') =>
      async (dispatch) => {
        if (input) {
          dispatch(actions[type === 'push' ? 'push' : 'get'](input));
          return input;
        }
      },
    // option: <multiple | rows>
    getMultiple:
      (inputs, type = 'get', option = 'multiple') =>
      async (dispatch) => {
        if (inputs) {
          dispatch(actions[`${type === 'push' ? 'push' : 'get'}${capitalizeFirstLetter(option)}`](inputs));
          if (!inputs.length) {
            dispatch(actions.setValue({ key: 'eot', value: true })); // eot : end of table
          }
          return inputs;
        }
      },
    // option: <multiple | rows>
    update:
      (input, type = 'update', option = '') =>
      async (dispatch) => {
        const { id, ...other } = input;
        if (input) {
          dispatch(actions[`${type}${capitalizeFirstLetter(option)}`]({ id, ...other }));
        }
        return input;
      },
    updateMultiple:
      ({ ids, attributes }, type = 'update', option = 'multiple') =>
      async (dispatch) => {
        let inputs = [];
        if (ids && attributes) {
          inputs = ids.map((id) => ({ id, ...attributes }));
          dispatch(actions[`${type}${capitalizeFirstLetter(option)}`](inputs));
        }
        return inputs;
      },
    delete: (id) => async (dispatch) => {
      if (id) {
        dispatch(actions.delete(id));
      }
      return id;
    },
    deleteMultiple: (ids) => async (dispatch) => {
      if (ids) {
        dispatch(actions.deleteMultiple(ids));
      }
      return ids;
    }
  };
}
