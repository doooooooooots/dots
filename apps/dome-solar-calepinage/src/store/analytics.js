import { round } from 'lodash';

const withAnalytics = (app) => ({
  ...app,

  analytics: {
    byId: {},
    overrideAnalytic: {},
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
  getSummary() {
    return {
      modules: this.getSummaryModules(),
      products: this.getSummaryProducts(),
    };
  },
  getTotalPower() {
    return round(
      this.totalModules() * (parseInt(this.getUserDatas('MPw'), 10) / 1000),
      2
    );
  },
  getAnalytics() {
    return this.analytics.byId;
  },
  setAnalytics(analyticObj) {
    this.analytics.byId = analyticObj;
  },
  setOverrideAnalytic(key, newValue) {
    this.analytics.overrideAnalytic[key] = newValue;
  },
  getFinalAnalytic(tagName) {
    const override =
      tagName in this.analytics.overrideAnalytic &&
      this.analytics.overrideAnalytic[tagName];

    const refGuid =
      tagName in this.analytic.bilan.references &&
      this.byId.bilan.references[tagName];

    const ref = refGuid in this.byId.refs && this.byId.refs[refGuid];

    const savedCount =
      tagName in this.byId.bilan.quantity && this.byId.bilan.quantity[tagName];

    return {
      key: tagName,
      ref: override.ref ?? (ref || ''),
      count: override.count ?? (savedCount || 0),
      delivery: override.delivery ?? true,
    };
  },
  getGlobalAnalytic() {
    const bilan = Object.keys(this.byId.bilan.references).map((item) =>
      this.getFinalAnalytic(item)
    );
    return {
      bilan,
      totalPower: this.byId.totalPower,
      totalModules: this.byId.totalPower,
    };
  },
});

export default withAnalytics;
