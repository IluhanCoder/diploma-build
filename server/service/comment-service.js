const mongoose = require("mongoose");
const commentModel = require("../models/comment-model");

class CommentService {
  async newComment(content, eventId, commenterId) {
    const convertedEventId = mongoose.Types.ObjectId(eventId);
    const convertedCommenterId = mongoose.Types.ObjectId(commenterId);
    const date = new Date();
    const comment = await commentModel.create({
      content,
      eventId: convertedEventId,
      commenterId: convertedCommenterId,
      date,
    });
    console.log(comment);
    return comment;
  }

  async getComments(eventId) {
    const convertedId = mongoose.Types.ObjectId(eventId);
    const comments = commentModel.aggregate([
      { $match: { eventId: convertedId } },
      {
        $lookup: {
          from: "users",
          localField: "commenterId",
          foreignField: "_id",
          as: "commenter",
        },
      },
      { $unwind: "$commenter" },
    ]);
    return comments;
  }

  async deleteComment(commentId) {
    await commentModel.deleteOne({ _id: commentId });
  }
}

module.exports = new CommentService();
