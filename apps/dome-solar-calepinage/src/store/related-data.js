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
      pdf: null,
    },

    updateRelatedData(key, value) {
      set(this.related, key, value);
    },
    setRelatedData(key, item) {
      this.related[key] = item;

      // Udpate solarModule
      if (key === 'roof' && !isEmpty(item)) {
        this.setUserData('Tx', item.lengthX);
        this.setUserData('Ty', item.lengthY);
        this.setObstacles(item.obstacles);
        if (!isEmpty(item.cladding)) {
          this.setRelatedData('cladding', item.cladding);
        }
      }

      if (key === 'solarModule' && !isEmpty(item)) {
        this.setUserData('Mx', item.lengthX);
        this.setUserData('My', item.lengthY);
        this.setUserData('Mh', item.lengthZ);
        this.setUserData('Mpw', item.electricalPower);
      }

      if (key === 'layout' && !isEmpty(item)) {
        // this.setUserData('Ex', item.lengthX);
        // this.setUserData('Ey', item.lengthY);
        // this.setUserData('X0', item.lengthY);
        // this.setUserData('Y0', item.lengthY);
        // this.setUserData('userMaxCol', item.lengthY);
        // this.setUserData('userMaxRow', item.lengthY);
        this.setUserData('useSolarEdge', item.solarEdge);

        if (!isEmpty(item.solarModule)) {
          this.setRelatedData('solarModule', item.solarModule);
        } else {
          this.setRelatedData('solarModule', null);
        }
        if (!isEmpty(item.product)) {
          this.setRelatedData('product', item.product);
        } else {
          this.setRelatedData('product', null);
        }
      }

      if (key === 'product' && !isEmpty(item)) {
        this.setUserData('Px', item.lengthX);
        this.setUserData('Py', item.lengthY);
        this.setUserData('Pz', item.lengthZ);
      }

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
