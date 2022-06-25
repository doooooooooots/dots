const withDialog = (app) => ({
  ...app,

  dialog: {
    open: false,
  },

  onOpenToClick(page) {
    return () => {
      this.dialog.open = page;
    };
  },

  closeDialog() {
    this.dialog.open = false;
  },

  getCurrentOpen() {
    return this.dialog.open;
  },

  isDialogOpen() {
    return !!this.dialog.open;
  },
});

export default withDialog;
