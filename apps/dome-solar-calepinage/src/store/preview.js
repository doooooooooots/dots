const withPreview = (app) => ({
  ...app,

  getPages() {
    const pages = Object.entries(this.snapshots).reduce(
      (acc, [key, item]) => {
        acc.push({ id: key, name: item.name });
        return acc;
      },
      [{}, { id: 'quantitative', name: 'Quantitatif' }]
    );

    pages.push({ id: 'malt', name: 'Malt' });
    return pages;
  },
});

export default withPreview;
