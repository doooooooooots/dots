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

  isDialogOpen() {
    return !!this.dialog.open;
  },
});

export default withDialog;
