const Mongoose = require("mongoose");
const feedbackModel = require("../models/feedback-model");

class FeedbackService {
  async newFeedback(senderId, receiverId, content, value) {
    const convertedSenderId = Mongoose.Types.ObjectId(senderId);
    await feedbackModel.create({ senderId, receiverId, content, value });
  }

  async getUserFeedbacks(userId) {
    const convertedUserId = Mongoose.Types.ObjectId(userId);
    const feedbacks = feedbackModel.aggregate([
      { $match: { receiverId: convertedUserId } },
      {
        $lookup: {
          localField: "senderId",
          from: "users",
          foreignField: "_id",
          as: "sender",
        },
      },
      { $unwind: "$sender" },
    ]);
    return feedbacks;
  }

  async getFeedBack(senderId, receiverId) {
    const convertedSenderId = Mongoose.Types.ObjectId(senderId);
    const convertedReceiverId = Mongoose.Types.ObjectId(receiverId);
    const feedback = await feedbackModel.findOne({
      senderId: convertedSenderId,
      receiverId: convertedReceiverId,
    });
    return feedback;
  }

  async deleteFeedback(feedbackId) {
    const convertedFeedbackId = Mongoose.Types.ObjectId(feedbackId);
    await feedbackModel.deleteOne({ _id: convertedFeedbackId });
  }

  async calculateRating(userId) {
    const convertedUserId = Mongoose.Types.ObjectId(userId);
    const result = await feedbackModel.aggregate([
      { $match: { receiverId: convertedUserId } },
      { $group: { _id: null, average: { $avg: "$value" } } },
      { $sort: { avarage: -1 } },
    ]);
    return result;
  }
}

module.exports = new FeedbackService();
