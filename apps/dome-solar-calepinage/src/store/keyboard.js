const withKeyboard = (app) => ({
  ...app,

  keyboard: {
    isShiftDown: false,
    isSpaceDown: false
  },

  getKeyboardState(key) {
    if (key === undefined) {
      return this.keyboard;
    }
    return this.keyboard[key];
  },

  setKeyboard(key, value) {
    this.keyboard[key] = value;
  },

  updateKeyboardState(state) {
    this.keyboard = {
      ...this.keyboard,
      ...state
    };
  }
});

export default withKeyboard;