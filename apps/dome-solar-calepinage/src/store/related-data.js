import { set, isEmpty } from 'lodash';

const withRelatedData = (app) => {
  return {
    ...app,

    related: {
      project: null,
      roof: null,
      layout: null,
      solarModule: null,
      product: null,
      massBalance: null,
      tests: null,
      isPassingTest: false,
    },

    updateRelatedData(key, value) {
      set(this.related, key, value);
    },
    setRelatedData(key, item) {
      this.related[key] = item;
      if (key === 'tests') {
        if (!isEmpty(item))
          this.related.isPassingTest = this.related.tests.reduce(
            (acc, { isPassingChecks }) => acc * isPassingChecks,
            true
          );
        else this.related.isPassingTest = false;
      } else {
        this.related.tests = null;
        this.related.isPassingTest = false;
      }
    },
    getAllRelatedData() {
      return this.related;
    },
    getRelatedData(key) {
      return this.related[key];
    },
    isPassingTests() {
      return this.related.isPassingTest;
    },
  };
};

export default withRelatedData;
