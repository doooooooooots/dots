export const withRender = (app) => ({
  ...app,

  stage: {
    x: 0,
    y: 0,
    isCentered: true
  },
  canvas: {
    x: 0,
    y: 0,
    scale: 1,
    isDragging: false,
    anchorPoint: 'top-left'
  },
  renderZone: {
    x: 0,
    y: 0,
    scale: 1
  },

  /**
   * Stage
   */

  getStageState() {
    return this.stage;
  },

  /**
   * Canvas
   */

  getAnchorPoint() {
    return this.canvas.anchorPoint;
  },
  setAnchorPoint(value) {
    this.canvas.anchorPoint = value;
  },
  getCanvasState() {
    return this.canvas;
  },
  getCanvasScale() {
    return this.canvas.scale;
  },

  /**
   * Render Zone
   */

  getRenderZoneState() {
    return this.renderZone;
  },
  getRatio() {
    return this.renderZone.scale;
  },
  getAspectRatio() {
    return this.stage.x / this.stage.y;
  },
  px(value) {
    return this.userDatas[value] * this.getRatio();
  },
  toPx(value, ratio = null) {
    if (ratio === null) return value * this.getRatio();
    return value * ratio;
  },

  reloadSize() {
    this.resetView();
    this.updateStageState({
      x: window.innerWidth - this.config.drawerWidth,
      y: window.innerHeight - this.config.topBarHeight - this.config.formTopBarHeight
    });
    this.draw();
  },

  /**
   * RenderZones
   */

  updateCanvasState(state) {
    this.canvas = {
      ...this.canvas,
      ...state
    };
  },
  updateRenderZoneState(state) {
    this.renderZone = {
      ...this.renderZone,
      ...state
    };
  },
  updateStageState(state) {
    this.stage = {
      ...this.stage,
      ...state
    };
  },

  /**
   * Resize
   */

  resetView() {
    this.updateCanvasState({
      x: 0,
      y: 0,
      scale: 1
    });
  },

  setSize(x, y) {
    this.resetView();
    this.updateStageState({
      x,
      y
    });
    this.draw();
  },

  renderView() {
    const currentMaxCol = this.getCurrentMaxCol();
    const currentMaxRow = this.getCurrentMaxRow();
    this.resetModules();
    if (currentMaxCol * currentMaxRow >= 0) {
      new Array(currentMaxCol * currentMaxRow).fill().forEach((element, index) => {
        this.addModule({ index });
      });
      this.resetModuleInterceptions();
      this.allObstacles().forEach((obstacle) => this.addObstacleInterceptions(obstacle));
      this.reloadSize();
      this.setNeedRerender(false);
    }
  }
});
