import $api from "../http";
import { ITicket } from "../models/ITicket";

export default class PropositionService {
  static async eventPropose(
    senderId: string,
    receiverId: string,
    eventId: string,
    role: string,
    comment: string
  ) {
    await $api.post("/event-propose", {
      proposerId: senderId,
      receiverId,
      eventId,
      role,
      comment,
    });
  }

  static async getPropositions(userId: string) {
    return await $api.get("/propositions/" + userId);
  }

  static async acceptProposition(propositionId: string) {
    return await $api.put(`/proposition/${propositionId}/true`);
  }

  static async rejectProposition(propositionId: string) {
    return await $api.put(`/proposition/${propositionId}/false`);
  }

  static async getProposition(receiverId: string, senderId: string) {
    return await $api.get(`/proposition/${receiverId}/${senderId}`);
  }
}
