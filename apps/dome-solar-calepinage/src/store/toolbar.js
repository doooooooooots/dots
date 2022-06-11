const withToolbar = (app) => ({
  ...app,

  toolbar: {
    viewMode: 'default',
    actionMode: 'alignment',
  },

  // ViewMode
  getViewMode() {
    return this.toolbar.viewMode;
  },
  setViewMode(mode) {
    this.toolbar.viewMode = mode;
  },
  getActionMode() {
    return this.toolbar.actionMode;
  },
  setActionMode(mode) {
    this.toolbar.actionMode = mode;
  },
});

export default withToolbar;
