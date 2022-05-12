export default function createHandlerApi({ actions }, api) {
  return {
    load: (input) => (dispatch) => {
      dispatch(actions.getMultiple(input));
    },
    get:
      (input, output, type = 'get') =>
      async (dispatch) => {
        const entry = await api.get(input, output);
        if (entry) {
          dispatch(actions[type === 'push' ? 'push' : 'get'](entry));
          return entry;
        }
      },
    // option: <multiple | rows>
    getMultiple:
      (input, output, type = 'get') =>
      async (dispatch) => {
        // if (type === 'get') {
        //   dispatch(actions.setValue({ key: 'eot', value: false }));
        // }
        const entries = await api.getMultiple(input, output);
        if (entries) {
          dispatch(actions[`${type === 'push' ? 'push' : 'get'}Multiple`](entries));
          // if (!entries.length) {
          //   dispatch(actions.setValue({ key: 'eot', value: true })); // eot : end of table
          // }
          return entries;
        }
      },
    // option: <'' | row>
    create:
      (input, output, type = 'push') =>
      async (dispatch) => {
        const entry = await api.create(input, output);
        if (entry) {
          dispatch(actions[type](entry));
        }
        return entry;
      },
    // option: <multiple | rows>
    createMultiple:
      (input, output, type = 'push') =>
      async (dispatch) => {
        const response = await api.createMultiple(input, output);
        if (response) {
          dispatch(actions[`${type}Multiple`](response.data || []));
        }
        return response;
      },
    update:
      ({ id, ...other }, output, type = 'update') =>
      async (dispatch) => {
        const entry = await api.update({ id, attributes: { ...other } }, output);
        if (entry) {
          dispatch(actions[type]({ id, ...other }));
        }
        return entry;
      },
    updateMultiple:
      ({ ids, attributes }, output, type = 'update') =>
      async (dispatch) => {
        const res = await api.updateMultiple({ ids, attributes }, output);
        if (res && 'status' in res && res.status === 200) {
          const inputs = ids.map((id) => ({ id, ...attributes }));
          dispatch(actions[`${type}Multiple`](inputs));
        }
        return res;
      },
    delete: (id) => async (dispatch) => {
      const entry = await api.deleteOne(id, ['id']);
      if (entry) {
        dispatch(actions.delete(entry.id));
      }
      return entry;
    },
    deleteMultiple: (ids) => async (dispatch) => {
      const entries = await api.deleteMultiple(ids);
      if (entries) {
        dispatch(actions.deleteMultiple(ids));
      }
      return entries;
    }
  };
}
