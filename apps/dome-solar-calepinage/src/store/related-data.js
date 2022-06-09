import { set } from 'lodash';

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
      layout: null,
    },

    updateRelatedData(key, value) {
      set(this.related, key, value);
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
