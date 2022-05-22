
class Module {
  constructor({ index, x, y }) {
    this.nodeType = 'module';
    this.id = index;
    this.index = index;
    this.isIntercepted = [];
    this.x = x;
    this.y = y;
  }
}

export const withModules = (app) => ({
  ...app,

  modules: {
    allIndexes: [],
    byIndex: {},

    desactived: [],
    selected: [],
    focused: [],

    viewMode: 'default',
    lastSelectedIndex: null
  },

  // ViewMode
  getViewMode() {
    return this.modules.viewMode;
  },
  setViewMode(mode) {
    this.modules.viewMode = mode;
  },

  // Last Selected
  getLastSelectedIndex() {
    return this.modules.lastSelectedIndex;
  },
  updateLastSelectedIndex(value) {
    this.modules.lastSelectedIndex = value;
  },

  /**
   * Modules
   */

  initModules(modules = {}) {
    this.modules.byIndex = modules;
    this.modules.allIndexes = Object.keys(modules);
  },
  resetModules() {
    this.modules.byIndex = {};
    this.modules.allIndexes = [];
    this.modules.desactived = [];
    this.modules.selected = [];
  },
  allModuleIndexes() {
    return this.modules.allIndexes;
  },
  allModulesByIndex() {
    return this.modules.byIndex;
  },
  allModules() {
    return Object.values(this.modules.byIndex);
  },
  allSelected() {
    return this.modules.selected
  },
  setModulesState(key, id, state) {
    if (state && !this.modules[key].includes(id)) {
      this.modules[key].push(id);
    } else if (!state) {
      const index = this.modules[key].indexOf(id);
      if (index > -1) {
        this.modules[key].splice(index, 1);
      }
    }
  },
  toggleModulesState(key, id) {
    const index = this.modules[key].indexOf(id);
    if (index > -1) {
      this.modules[key].splice(index, 1);
    } else {
      this.modules[key].push(id);
    }
  },

  /**
   * Module Element
   */

  getModule(index) {
    return this.modules.byIndex[index] || null;
  },
  addModule({ index }) {
    const x = this.toPx(this.getModuleXPosAbsolute(index));
    const y = this.toPx(this.getModuleYPosAbsolute(index));
    this.modules.byIndex[index] = new Module({ index, x, y });
    this.modules.allIndexes.push(index);
  },

  // Active
  allDesactivatedIndex() {
    return this.modules.desactived;
  },
  isActive(index) {
    return this.allModuleIndexes().includes(index) && !this.allDesactivatedIndex().includes(index);
  },
  setActive(id, state) {
    this.setModulesState('desactived', id, !state);
  },
  toggleActive(index) {
    const _isActive = this.isActive(index);
    this.setActive(index, !_isActive);
  },
  setActiveAll(state) {
    if (!state) {
      this.modules.desactived = [...this.allDesactivatedIndex(), ...this.modules.selected];
    } else {
      this.modules.desactived = this.allDesactivatedIndex().filter((index) => !this.modules.selected.includes(index));
    }
  },

  // Focused
  isFocused(index) {
    return this.allModuleIndexes().includes(index) && this.modules.focused.includes(index);
  },
  setFocused(indexes) {
    this.modules.focused = indexes;
  },
  toggleModule(index, withLastRef = false) {
    const lastIndex = this.getLastSelectedIndex();
    if (this.getViewMode() === 'select') {
      this.setSelected(index, !this.isSelected(index));
    } else if (this.getViewMode() === 'default') {
      this.setActive(index, withLastRef ? this.isActive(lastIndex) : !this.isActive(index));
    }
  },
  toggleAllRange(clickedIndex, withLastRef = false) {
    const lastIndex = this.getLastSelectedIndex();

    let fromCol = this.getCol(lastIndex);
    let fromRow = this.getRow(lastIndex);
    let toCol = this.getCol(clickedIndex);
    let toRow = this.getRow(clickedIndex);

    if (fromRow > toRow) {
      [fromRow, toRow] = [toRow, fromRow];
    }
    if (fromCol > toCol) {
      [fromCol, toCol] = [toCol, fromCol];
    }
    for (let col = fromCol; col <= toCol; col++) {
      for (let row = fromRow; row <= toRow; row++) {
        const index = this.getIndex(col, row);
        if (index !== lastIndex) {
          this.toggleModule(index, withLastRef);
        }
      }
    }
  },

  /**
   * Utils
   */

  isStartBlock(index) {
    return !this.isActive(index - this.getCurrentMaxCol());
  },
  // isEndBlock if the next one in not active or if it's the last
  isEndBlock(index) {
    return !this.isActive(index + this.getCurrentMaxCol());
  },
  totalModules() {
    return this.allModuleIndexes().length - this.allDesactivatedIndex().length;
  }
});


