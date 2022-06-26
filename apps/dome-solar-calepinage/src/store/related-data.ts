import { set, isEmpty, round } from 'lodash';
import Alignment from '../components/dots-system/enums/alignment';

const correspondingDatas = Object.freeze({
  roof: {
    lengthX: 'Tx',
    lengthY: 'Ty',
  },
  solarModule: {
    lengthX: 'Mx',
    lengthY: 'My',
    lengthZ: 'Mh',
    electricalPower: 'Mpw',
  },
  layout: {
    moduleSpaceBetweenX: 'Ex',
    moduleSpaceBetweenY: 'Ey',
    numberOfColumns: 'userMaxCol',
    numberOfLines: 'userMaxRow',
    offsetX: 'X0',
    offsetY: 'Y0',
    solarEdge: 'useSolarEdge',
  },
  product: {
    lengthX: 'Px',
    lengthY: 'Py',
    lengthZ: 'Pz',
  },
});

const dependencies = Object.freeze({
  project: ['roof'],
  roof: ['cladding', 'layout'],
  cladding: [],
  layout: ['solarModule', 'product'],
  solarModule: [],
  product: [],
});

const withRelatedData = (app) => {
  return {
    ...app,

    related: {
      project: null,
      roof: null,
      layout: null,
      cladding: null,
      solarModule: null,
      product: null,
      pdf: null,

      massBalance: null,
      overrideBalance: null,

      tests: null,
      isPassingTest: false,
    },

    updateRelatedData(key: string, value: unknown) {
      this.related = set(this.related, key, value);
    },

    mergeRelated(key, value) {
      this.related[key] = {
        ...this.related[key],
        ...value,
      };
    },

    setCorrespondingUserData(entity, corresponding) {
      Object.entries(corresponding).forEach(([dbKey, appKey]) => {
        if (entity[dbKey] != null) {
          this.setUserData(appKey, entity[dbKey]);
        }
      });
    },

    deleteDependencies(key) {
      if (isEmpty(dependencies[key])) return;
      dependencies[key].forEach((dependency) => {
        this.setRelatedData(dependency, null);
      });
    },

    setRelatedData(key, item) {
      console.log(key, item);
      // DELETE -- ref and depending
      if (isEmpty(item)) {
        this.related[key] = null;
        this.deleteDependencies(key);
        this.related.isPassingTest = false;
        this.related.tests = null;
        return;
      }

      this.related[key] = item;

      // CONNECT -- new entry and dependencies
      if (key in correspondingDatas) {
        this.setCorrespondingUserData(item, correspondingDatas[key]);
      }

      // CASE ROOF
      if (key === 'roof') {
        this.setObstacles(item.obstacles);
        if (!isEmpty(item.cladding)) {
          this.setRelatedData('cladding', item.cladding);
        }
      }

      // CASE LAYOUT
      if (key === 'layout') {
        const { TOP_LEFT } = Alignment.getValues();
        this.setAnchorPoint(item.alignment || TOP_LEFT);
        ['solarModule', 'product'].forEach((key) => {
          this.setRelatedData(key, !isEmpty(item[key]) ? item[key] : null);
        });
      }

      if (key !== 'tests') {
        this.related.isPassingTest = false;
        this.related.tests = null;
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

    getSummaryModules() {
      return this.modules.allIndexes.reduce(
        (acc, index) => {
          if (!this.isActive(index)) return acc;

          if (this.isStartBlock(index)) {
            acc.top++;
          }
          if (this.isEndBlock(index)) {
            acc.bottom++;
          }
          if (!this.isStartBlock(index) && !this.isEndBlock(index)) {
            acc.middle++;
          }
          acc.total++;
          return acc;
        },
        { top: 0, middle: 0, bottom: 0, total: 0 }
      );
    },

    getSummaryProducts() {
      const summaryModules = this.getSummaryModules();

      return {
        top: 2 * summaryModules.top,
        bottom: 2 * summaryModules.bottom,
        middle:
          2 * (summaryModules.top + summaryModules.middle) -
          2 *
            (summaryModules.top +
              summaryModules.bottom +
              summaryModules.middle -
              summaryModules.totalModules),
      };
    },

    getTotalPower() {
      return round(
        this.totalModules() * (parseInt(this.getUserDatas('MPw'), 10) / 1000),
        2
      );
    },

    getSummary() {
      return {
        totalPower: this.getTotalPower(),
        modules: this.getSummaryModules(),
        products: this.getSummaryProducts(),
      };
    },

    getMergeBalance() {
      const override = this.related.overrideBalance || {};
      const raw = this.related.massBalance?.data || {};

      return Object.entries(raw).map(
        ([key, defaultRef]: [
          string,
          {
            reference?: { [key: string]: unknown };
            count?: number;
            delivery?: boolean;
          }
        ]) => {
          const overrideRef = (key in override && override[key]) || {};
          return {
            key: key,
            reference: overrideRef.reference ?? (defaultRef.reference || ''),
            count: overrideRef.count ?? (defaultRef.count || 0),
            delivery: overrideRef.delivery ?? defaultRef.delivery,
          };
        }
      );
    },

    getMassBalance() {
      return {
        balance: this.getMergeBalance(),
        ...this.getSummary(),
      };
    },
  };
};

export default withRelatedData;
