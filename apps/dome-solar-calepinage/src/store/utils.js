const withUtils = (app) => ({
  ...app,

  setState(key, id, state) {
    if (state && !this[key].includes(id)) {
      this[key].push(id);
    } else if (!state) {
      const index = this[key].indexOf(id);
      if (index > -1) {
        this[key].splice(index, 1);
      }
    }
  },

  toggleState(key, id) {
    const index = this[key].indexOf(id);
    if (index > -1) {
      this[key].splice(index, 1);
    } else {
      this[key].push(id);
    }
  }
});

export default withUtils;