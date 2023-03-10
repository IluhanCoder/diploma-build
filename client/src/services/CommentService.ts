import $api from "../http";

export default class CommenntService {
  static async newComment(
    commenterId: string,
    eventId: string,
    content: string
  ) {
    return await $api
      .post("/comment", { commenterId, eventId, content })
      .then();
  }

  static async getComments(eventId: string) {
    return await $api.get(`/comments/${eventId}`);
  }

  static async deleteComment(commentId: string) {
    return await $api.delete(`/comment/${commentId}`);
  }
}
