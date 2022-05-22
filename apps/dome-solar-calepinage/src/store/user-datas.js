import { getIndexTrunc } from '../utils/trunc-int';

export const withUserDatas = (app) => ({
  ...app,

  userDatas: {
    name: '',
    // Roof
    Tx: 12000,
    Ty: 13000,
    // Solar edge
    useSolarEdge: false,
    // Roof offset
    X0: 100,
    Y0: 100,
    // Modules
    Mx: 1800,
    My: 850,
    Mh: 23,
    MPw: 335,
    // Modules spaces
    Ex: 9,
    Ey: 9,
    // Product
    Px: 50,
    Py: 130,
    Pz: 15,
    // Cover
    Cx: 1000,
    Cy: 1000,
    Cz: 45,
    isCoverCenter: 0,
    CnbOfWaves: 3,
    // Template
    PigeX0: 130,
    PigeX1: 130,
    PigeMX0: 330,
    PigeMX1: 330,
    isPigeSymetrical: true,
    // User restriction
    userMaxCol: 0,
    userMaxRow: 0,
    currentLastCol: -1,
  },

  getUserDatas(key) {
    if (key !== undefined) {
      return this.userDatas[key];
    }
    return this.userDatas;
  },
  setUserData(key, value) {
    let parsedValue;
    switch (value) {
      case 'true':
        this.userDatas[key] = true;
        break;
      case 'false':
        this.userDatas[key] = false;
        break;
      default:
        parsedValue = parseFloat(value, 10);
        this.userDatas[key] = Number.isNaN(parsedValue) ? value : parsedValue;
    }
  },
  updateUserDatas(newValues) {
    let formattedValues = Object.entries(newValues).map(([key, value]) => [
      key,
      parseInt(value, 10),
    ]);

    formattedValues = Object.fromEntries(formattedValues);

    this.userDatas = {
      ...this.userDatas,
      ...formattedValues,
    };
  },

  /**
   * POSITIONS
   * ---------
   */

  getCol(index) {
    return index % this.getCurrentMaxCol();
  },
  getRow(index) {
    return Math.trunc(index / this.getCurrentMaxCol());
  },
  getIndex(col, row) {
    return row * this.getCurrentMaxCol() + col;
  },
  getMaxCol() {
    const maxCol = Math.trunc(
      (this.getUserDatas('Tx') +
        this.getUserDatas('Ex') -
        this.getUserDatas('X0')) /
        (this.getUserDatas('Mx') + this.getUserDatas('Ex'))
    );
    return maxCol;
  },
  getMaxRow() {
    const maxRow = Math.trunc(
      (this.getUserDatas('Ty') +
        this.getUserDatas('Ey') -
        this.getUserDatas('Y0') -
        (this.getUserDatas('Py') - this.getRailMiddleOffset()) -
        this.getConfig()?.railBottomOffset) /
        (this.getUserDatas('My') + this.getUserDatas('Ey'))
    );
    return maxRow;
  },
  getCurrentMaxCol() {
    return this.getUserDatas('userMaxCol') &&
      this.getUserDatas('userMaxCol') <= this.getMaxCol()
      ? Math.max(this.getUserDatas('userMaxCol'), 1)
      : this.getMaxCol();
  },
  getCurrentMaxRow() {
    return this.getUserDatas('userMaxRow') &&
      this.getUserDatas('userMaxRow') <= this.getMaxRow()
      ? Math.max(this.getUserDatas('userMaxRow'), 1)
      : this.getMaxRow();
  },
  setCurrentLastCol(index) {
    this.userDatas.currentLastCol = index;
  },
  getCurrentLastCol() {
    return this.userDatas.currentLastCol;
  },

  getModuleXPosAbsolute(index) {
    return (
      this.getCol(index) * (this.getUserDatas('Mx') + this.getUserDatas('Ex'))
    );
  },
  getModuleYPosAbsolute(index) {
    return (
      this.getRow(index) * (this.getUserDatas('My') + this.getUserDatas('Ey'))
    );
  },
  getPosX(index) {
    return this.getModuleXPosAbsolute(index) + this.offsetX();
  },
  getPosY(index) {
    return (
      this.getModuleYPosAbsolute(index) +
      this.offsetY() +
      (this.getUserDatas('Py') - this.getRailMiddleOffset())
    );
  },

  /**
   * Rails
   * -----
   */

  railPosX() {
    return this.getConfig().railOffset - this.getUserDatas('Px') / 2;
  },
  getRailTop() {
    return this.getUserDatas('Py') - this.getRailMiddleOffset();
  },
  getRailMiddleOffset() {
    return (this.getUserDatas('Py') - this.getUserDatas('Ey')) / 2;
  },

  /**
   * Manage sizes
   * ------------
   */

  // Generator size
  generatorX() {
    return (
      this.getCurrentMaxCol() *
        (this.getUserDatas('Mx') + this.getUserDatas('Ex')) -
      this.getUserDatas('Ex')
    );
  },
  generatorY() {
    return (
      this.getCurrentMaxRow() *
        (this.getUserDatas('My') + this.getUserDatas('Ey')) -
      this.getUserDatas('Ey')
    );
  },

  // Space left between right of generator and right of roof
  spaceLeftX() {
    const offset =
      this.getCurrentLastCol() !== -1
        ? (this.getCurrentMaxCol() - (this.getCurrentLastCol() + 1)) *
          (this.getUserDatas('Mx') + this.getUserDatas('Ex'))
        : 0;

    switch (this.getAnchorPoint().split('-')[1]) {
      case 'right':
        return this.getUserDatas('X0') + offset;
      case 'center':
        return (this.getUserDatas('Tx') - this.generatorX()) / 2 + offset;
      case 'left':
      default:
        return (
          this.getUserDatas('Tx') -
          this.generatorX() -
          this.getUserDatas('X0') +
          offset
        );
    }
  },

  // Space left between bottom of generator and bottom of roof
  spaceLeftY() {
    switch (this.getAnchorPoint().split('-')[0]) {
      case 'top':
      default:
        return (
          this.getUserDatas('Ty') -
          this.generatorY() -
          this.getUserDatas('Y0') -
          (this.getUserDatas('Py') - this.getRailMiddleOffset())
        );
      case 'middle':
        return (
          (this.getUserDatas('Ty') -
            this.generatorY() -
            (this.getUserDatas('Py') - this.getRailMiddleOffset()) -
            this.getConfig().railBottomOffset) /
            2 +
          this.getConfig().railBottomOffset
        );
      case 'bottom':
        return this.getUserDatas('Y0') + this.getConfig().railBottomOffset;
    }
  },

  // Offset :
  offsetX() {
    switch (this.getAnchorPoint().split('-')[1]) {
      case 'left':
      default:
        return this.getUserDatas('X0');
      case 'center':
        return (this.getUserDatas('Tx') - this.generatorX()) / 2;
      case 'right':
        return (
          this.getUserDatas('Tx') - this.generatorX() - this.getUserDatas('X0')
        );
    }
  },
  offsetY() {
    switch (this.getAnchorPoint().split('-')[0]) {
      case 'top':
      default:
        return this.getUserDatas('Y0');
      case 'middle':
        return (
          (this.getUserDatas('Ty') -
            this.generatorY() -
            (this.getUserDatas('Py') - this.getRailMiddleOffset()) -
            this.getConfig().railBottomOffset) /
          2
        );
      case 'bottom':
        return (
          this.getUserDatas('Ty') -
          this.generatorY() -
          this.getUserDatas('Y0') -
          (this.getUserDatas('Py') -
            this.getRailMiddleOffset() +
            this.getConfig().railBottomOffset)
        );
    }
  },

  // Get current column or right column if we are in space between two modules
  getColOrRightFromX(x, outOfRange = 0) {
    const col =
      (x - this.offsetX() - this.getUserDatas('Mx')) /
        (this.getUserDatas('Mx') + this.getUserDatas('Ex')) +
      1;
    return getIndexTrunc(col, outOfRange);
  },
  // Get current row or bottom row if we are in space between two modules
  getRowOrBottomFromY(y, outOfRange = 0) {
    const row =
      (y -
        this.offsetY() -
        (this.getUserDatas('Py') - this.getRailMiddleOffset()) -
        this.getUserDatas('My')) /
        (this.getUserDatas('My') + this.getUserDatas('Ey')) +
      1;
    return getIndexTrunc(row, outOfRange);
  },
  // Get current column or left column if we are in space between two modules
  getColOrLeftFromX(x, outOfRange = -1) {
    const col =
      (x - this.offsetX()) /
      (this.getUserDatas('Mx') + this.getUserDatas('Ex'));
    return getIndexTrunc(col, outOfRange);
  },
  // Get current row or upper row if we are in space between two modules
  getRowOrUpperFromY(y, outOfRange = -1) {
    const row =
      (y - this.offsetY()) /
      (this.getUserDatas('My') + this.getUserDatas('Ey'));
    return getIndexTrunc(row, outOfRange);
  },

  getModuleRange(element, outOfRange) {
    const fromCol = this.getColOrRightFromX(element.x, outOfRange);
    const fromRow = this.getRowOrBottomFromY(element.y, outOfRange);
    const toCol = this.getColOrLeftFromX(element.x + element.width, outOfRange);
    const toRow = this.getRowOrUpperFromY(
      element.y + element.height,
      outOfRange
    );
    if (fromCol > toCol || fromRow > toRow) return null;
    return { fromCol, fromRow, toCol, toRow };
  },
});

export default withUserDatas;
