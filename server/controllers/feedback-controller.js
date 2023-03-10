const userModel = require("../models/user-model");
const feedbackService = require("../service/feedback-service");

class FeedbackController {
  async newFeedback(req, res, next) {
    try {
      const { senderId, receiverId, content, value } = req.body;
      await feedbackService.newFeedback(senderId, receiverId, content, value);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async getUserFeedbacks(req, res, next) {
    try {
      const { receiverId } = req.params;
      const feedBacks = await feedbackService.getUserFeedbacks(receiverId);
      return res.status(200).json(feedBacks);
    } catch (error) {
      next(error);
    }
  }

  async getFeedBack(req, res, next) {
    try {
      const { senderId, receiverId } = req.params;
      const feedback = await feedbackService.getFeedBack(senderId, receiverId);
      return res.status(200).json(feedback);
    } catch (error) {
      next(error);
    }
  }

  async deleteFeedback(req, res, next) {
    try {
      const { feedbackId } = req.params;
      await feedbackService.deleteFeedback(feedbackId);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async calculateRating(req, res, next) {
    try {
      const { userId } = req.params;
      const rating = await feedbackService.calculateRating(userId);
      return res.status(200).json(rating);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FeedbackController();
