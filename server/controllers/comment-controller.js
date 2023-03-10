const commentService = require("../service/comment-service");

class CommentController {
  async newComment(req, res, next) {
    try {
      const { commenterId, eventId, content } = req.body;
      await commentService.newComment(content, eventId, commenterId);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async getComments(req, res, next) {
    try {
      const { eventId } = req.params;
      const comments = await commentService.getComments(eventId);
      return res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { commentId } = req.params;
      await commentService.deleteComment(commentId);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
