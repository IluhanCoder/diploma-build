import $api from "../http";

export default class InviteService {
  static async newInvite(
    proposerId: string,
    receiverId: string,
    eventId: string,
    role: string,
    comment: string
  ) {
    try {
      await $api.post("/event-invite", {
        proposerId,
        receiverId,
        eventId,
        role,
        comment,
      });
    } catch (error: any) {
      throw error;
    }
  }

  static async getInvites(userId: string) {
    return await $api.get("/invites/" + userId);
  }

  static async getInvite(receiverId: string, eventId: string) {
    return await $api.get(`/invite/${receiverId}/${eventId}`);
  }

  static async eventInviteExists(eventId: string) {
    return await $api.get(`/invite-exists/${eventId}`);
  }

  static async acceptInvite(inviteId: string) {
    return await $api.put(`/invite/${inviteId}/true`);
  }

  static async rejectInvite(inviteId: string) {
    return await $api.put(`/invite/${inviteId}/false`);
  }
}
