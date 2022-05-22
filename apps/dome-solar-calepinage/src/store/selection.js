const withSelection = (app) => ({
  ...app,

  selection: {
    x0: 0,
    y0: 0,
    x1: 200,
    y1: 200,
    visible: false
  },

  /**
   * Gestion des selections
   */
  isSelected(index) {
    return this.modules.selected.includes(index) && this.allModuleIndexes().includes(index);
  },
  getSelectionState() {
    return this.selection;
  },
  setSelected(id, state) {
     this.setModulesState('selected', id, state);
  },
  toggleSelected(id) {
    this.toggleModulesState('selected', id);
  },
  resetSelected() {
    this.modules.selected = [];
  },
  toggleToSelect(col, row) {
    const index = this.getIndex(col, row);
    this.toggleSelected(index);
  },

  getSelected({ x, y, width, height }) {
    const indexes = this.getModuleRange(
      {
        x: x / this.getRatio(),
        y: y / this.getRatio(),
        width: width / this.getRatio(),
        height: height / this.getRatio()
      },
      -1
    );

    if (!indexes) return;

    const { fromCol, fromRow } = indexes;
    const { toCol, toRow } = indexes;

    if (fromCol === toCol && fromRow === toRow) {
      if (fromCol < this.getCurrentMaxCol() && fromRow < this.getCurrentMaxRow()) {
        this.toggleToSelect(fromCol, fromRow);
      }
      return;
    }

    for (let col = fromCol + 1; col < toCol && col < this.getCurrentMaxCol(); col++) {
      for (let row = fromRow + 1; row < toRow && row < this.getCurrentMaxRow(); row++) {
        this.toggleToSelect(col, row);
      }
    }
  },

  updateSelectionState(state) {
    this.selection = {
      ...this.selection,
      ...state
    };
  }
});

export default withSelection;