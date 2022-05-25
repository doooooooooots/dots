export const withComments = (app) => ({
  ...app,

  comments: {
    current: null,
    byId: {},
  },

  /**
   * Comments
   */

  getCommentById(id) {
    return this.comments.byId[id];
  },
  getAllComments() {
    return this.comments.byId;
  },
  setCurrentComment(commentId) {
    this.comments.current = commentId;
  },
  setComment(key, value) {
    this.comments.byId[key] = value;
  },
  saveComments(comments) {
    this.comments.byId = comments;
  },
});
