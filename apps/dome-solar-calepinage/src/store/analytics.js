const withAnalytics = (app) => ({
  ...app,

  analytics: {
    byId: {},
    overrideAnalytic: {}
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
    const override = tagName in this.analytics.overrideAnalytic && this.analytics.overrideAnalytic[tagName];

    const refGuid = tagName in this.analytic.bilan.references && this.byId.bilan.references[tagName];

    const ref = refGuid in this.byId.refs && this.byId.refs[refGuid];

    const savedCount = tagName in this.byId.bilan.quantity && this.byId.bilan.quantity[tagName];

    return {
      key: tagName,
      ref: override.ref ?? (ref || ''),
      count: override.count ?? (savedCount || 0),
      delivery: override.delivery ?? true
    };
  },

  getGlobalAnalytic() {
    const bilan = Object.keys(this.byId.bilan.references).map((item) => this.getFinalAnalytic(item));
    return {
      bilan,
      totalPower: this.byId.totalPower,
      totalModules: this.byId.totalPower
    };
  }
});

export default withAnalytics;