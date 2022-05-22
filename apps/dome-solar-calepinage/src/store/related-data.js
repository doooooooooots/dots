const withRelatedData = (app) => {
  return {
    ...app,

    related: {
      solarModule: null,
      cladding: null,
      project: null,
      product: null
    },

    setRelatedData(key, item) {
      this.related[key] = item;
    },
    getRelatedData(key) {
      return this.related[key];
    }
  };
}

export default withRelatedData