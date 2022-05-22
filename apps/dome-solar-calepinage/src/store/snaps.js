export const withSnaps = (app) => ({
  ...app,
  snaps: {
    currentRows: []
  },
  snapshots: {},

  /**
   *
   * Manage Render
   * -----------
   */

  getSnaps() {
    return this.snapshots;
  },

  resetSnaps() {
    this.snapshots = {};
    this.snaps.currentRows = [];
  },

  snapshot({ id = null, name = '', comment = '' }) {
    const snap = this.getCurrentStage().toDataURL({ pixelRatio: 3 });

    this.snapshots[id] = {
      aspectRatio: this.getAspectRatio(),
      snap,
      name,
      comment
    };
  },

  setCurrentRows(ids) {
    this.snaps.currentRows = ids;
  },

  getCurrentRows() {
    return this.snaps.currentRows;
  },

  countToSnap(attrs = {}) {
    const { id = null, name = '', comment = '', timer = 200 } = attrs;
    // eslint-disable-next-line no-undef
    return new Promise((resolve) => {
      this.setSize(this.config.snapSize.x, this.config.snapSize.y);
      setTimeout(() => {
        this.snapshot({
          id,
          name,
          comment
        });
        resolve();
      }, timer);
    });
  },

  snapRailsAndGenerator() {
    // eslint-disable-next-line no-undef
    return new Promise((resolve) => {
      this.setSize(this.config.snapSize.x, this.config.snapSize.y);
      let cols = {};

      // Take snap of all generator
      const baseTimer = this.config.snapTime;
      let timer = 0;

      setTimeout(() => {
        this.snapshot({
          id: 'generator',
          name: 'Générateur'
        });
      }, timer);

      // Browse each column and get starting rows
      for (let col = 0; col < this.getCurrentMaxCol(); col++) {
        let currentCol = [];
        let startRow = null;

        for (let row = this.getCurrentMaxRow() - 1; row >= 0; row--) {
          const index = this.getIndex(col, row);
          if (this.isActive(index)) {
            currentCol.push(index);
            startRow = startRow ?? row;
          } else if (currentCol.length) {
            cols[col] = cols[col] ?? {
              allIndexes: [],
              startRows: []
            };
            cols[col].allIndexes = [...cols[col].allIndexes, ...currentCol];
            cols[col].startRows.push(startRow);
            currentCol = [];
            startRow = null;
          }
        }

        if (currentCol.length) {
          cols[col] = cols[col] ?? {
            allIndexes: [],
            startRows: []
          };
          cols[col].allIndexes = [...cols[col].allIndexes, ...currentCol];
          cols[col].startRows.push(startRow);
          startRow = null;
        }
      }

      cols = Object.entries(cols).reduce((acc, [col, item]) => {
        acc[item.startRows.join('-')] = acc[item.startRows.join('-')] ?? { allIndexes: [], cols: [] };
        acc[item.startRows.join('-')].allIndexes.push(...item.allIndexes);
        acc[item.startRows.join('-')].cols.push(parseInt(col, 10) + 1);
        return acc;
      }, {});

      // Take all columns snaps
      if (Object.keys(cols).length > 1) {
        timer += baseTimer;
        Object.entries(cols).forEach(([key, value], index) => {
          setTimeout(() => {
            this.setCurrentRows(key.split('-'));
            this.setFocused(value.allIndexes);
            this.setCurrentLastCol(this.getCol(value.allIndexes[0]));
            const id = `000${index}`.slice(-3);
            const name = value.cols.length > 1 ? 'Détails colonnes' : 'Détails colonne';
            const comment =
              value.cols.length > 1
                ? `Détails des colonnes ${value.cols.join(', ')}`
                : `Détail de la colonne ${value.cols[0]}`;
            this.snapshot({
              id,
              name,
              comment
            });
          }, timer);
          timer += baseTimer;
        });
      }

      // Reload scene
      setTimeout(() => {
        this.setFocused([]);
        this.setCurrentRows([]);
        this.reloadSize();
        resolve();
      }, timer);
    });
  }
});