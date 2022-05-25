const withRelatedData = (app) => {
  return {
    ...app,

    related: {
      project: null,
      roof: null,
      cladding: null,
      solarModule: null,
      product: null,
      massBalance: null,
    },

    setRelatedData(key, item) {
      this.related[key] = item;
    },
    getAllRelatedData() {
      return this.related;
    },
    getRelatedData(key) {
      return this.related[key];
    },
  };
};

export default withRelatedData;
