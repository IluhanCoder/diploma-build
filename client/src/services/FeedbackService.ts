import $api from "../http";

export default class FeedbackService {
  static async newFeedback(
    senderId: string,
    receiverId: string,
    content: string,
    value: number
  ) {
    await $api.post("/feedback", { senderId, receiverId, content, value });
  }

  static async getUserFeedbacks(userId: string) {
    return await $api.get(`/feedback/${userId}`);
  }

  static async getFeedback(senderId: string, receiverId: string) {
    return await $api.get(`/feedback/${senderId}/${receiverId}`);
  }

  static async deleteFeedback(feedbackId: string) {
    return await $api.delete(`/feedback/${feedbackId}`);
  }

  static async getRating(userId: string) {
    return await $api.get(`/rating/${userId}`);
  }
}
