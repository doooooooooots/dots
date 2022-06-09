import { isEmpty } from 'lodash';

let indexObs = 1;

const createRandomId = () =>
  [...Array(9)].map(() => Math.random().toString(36)[2]).join('');

class Obstacle {
  constructor({ name, x, y, width, height, type }) {
    this.id = createRandomId();
    this.index = indexObs++;
    this.name = name;
    this.x = parseFloat(x, 10);
    this.y = parseFloat(y, 10);
    this.width = parseFloat(width, 10);
    this.height = parseFloat(height, 10);
    this.type = type || 'none';
  }
}

export const withObstacles = (app) => ({
  ...app,

  obstacles: [],
  /**
   * Gestion des obstacles
   */
  allObstacles() {
    return this.obstacles;
  },

  setObstacles(data) {
    this.obstacles = data;
  },

  getObstacleById(id) {
    return this.obstacles.find((obstacle) => obstacle.id === id);
  },

  addObstacle(attrs) {
    // Delete if already exists (update action)
    if (!isEmpty(attrs.id)) {
      this.removeObstacle(attrs.id);
    }
    const newObstacle = new Obstacle(attrs);
    this.obstacles.push(newObstacle);
    this.addObstacleInterceptions(newObstacle);
    return this.obstacles;
  },

  removeObstacle(id) {
    // Remove obstacles from concerned modules isIntercepted
    const removedObstacle = this.getObstacleById(id);
    this.removeObstacleInterceptions(removedObstacle);

    // // Filter out this obstacle from obstacles
    const filteredObstacles = this.obstacles.filter(
      (obstacle) => obstacle.id !== id
    );
    this.obstacles = filteredObstacles;
    return filteredObstacles;
  },

  isModuleInterceptedByObstacle(index, obstacleId) {
    const currentModule = this.getModule(index);
    return currentModule.isIntercepted.includes(obstacleId);
  },

  addObstacleInterceptions(obstacle) {
    const indexes = this.getModuleRange(obstacle);
    if (!indexes) return;

    const { fromCol, fromRow, toCol, toRow } = indexes;
    for (
      let col = fromCol;
      col <= toCol && col < this.getCurrentMaxCol();
      col++
    ) {
      for (
        let row = fromRow;
        row <= toRow && row < this.getCurrentMaxRow();
        row++
      ) {
        const index = this.getIndex(col, row);
        if (!this.isModuleInterceptedByObstacle(index, obstacle.id)) {
          this.setActive(index, false);
          const currentModule = this.getModule(index);
          currentModule.isIntercepted.push(obstacle.id);
        }
      }
    }
  },

  removeObstacleFromModuleIsIntercepted(index, obstacleId) {
    const indexObstacle =
      this.getModule(index).isIntercepted.indexOf(obstacleId);
    this.getModule(index).isIntercepted.splice(indexObstacle, 1);
  },

  removeObstacleInterceptions(obstacle) {
    const indexMax = this.getCurrentMaxCol() * this.getCurrentMaxRow();
    const indexes = this.getModuleRange(obstacle);
    if (!indexes) return;
    const { fromCol, fromRow, toCol, toRow } = indexes;

    for (let col = fromCol; col <= toCol; col++) {
      for (let row = fromRow; row <= toRow; row++) {
        const index = this.getIndex(col, row);
        if (index < indexMax) {
          this.removeObstacleFromModuleIsIntercepted(index, obstacle.id);
          if (
            !this.isActive(index) &&
            this.getModule(index).isIntercepted.length === 0
          ) {
            this.setActive(index, true);
          }
        }
      }
    }
  },

  resetModuleInterceptions() {
    this.obstacles.forEach((id) => {
      if (this.getModule(id)) {
        this.getModule(id).isIntercepted = [];
      }
    });
    this.modules.desactived = [];
  },
});
