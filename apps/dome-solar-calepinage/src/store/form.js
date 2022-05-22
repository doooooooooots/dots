const withForm = (app) => ({
  ...app,

  form: {
    currentRows: [],
    currentStep: 'isLayoutOf',
    currentLayout: null,
    currentProjectId: null,
  },

  defaultTargets: {},

  currentActions: {},

  related: {
    project: {},
    client: {},
    location: {},
    commercial: {}
  },

  getFormRows () {
    return this.form.currentRows;
  }

});

export default withForm