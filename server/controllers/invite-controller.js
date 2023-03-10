const inviteService = require("../service/invite-service");

class InviteController {
  async eventInvite(req, res, next) {
    try {
      const { proposerId, receiverId, eventId, role, comment } = req.body;
      const currentDate = new Date();
      await inviteService.newInvite(
        proposerId,
        receiverId,
        eventId,
        role,
        currentDate,
        comment
      );
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async getUserInvites(req, res, next) {
    try {
      const { userId } = req.params;
      const invites = await inviteService.getUserInvites(userId);
      return res.status(200).json(invites);
    } catch (error) {
      next(error);
    }
  }

  async getInvite(req, res, next) {
    try {
      const { receiverId, eventId } = req.params;
      const invite = await inviteService.getInvite(receiverId, eventId);
      return res.status(200).json(invite);
    } catch (error) {
      next(error);
    }
  }

  async eventInviteExists(req, res, next) {
    console.log("called");
    try {
      const { eventId } = req.params;
      const isExist = await inviteService.eventInviteExists(eventId);
      console.log(isExist);
      return res.status(200).json(isExist);
    } catch (error) {
      next(error);
    }
  }

  async removeInvite(req, res, next) {
    try {
      const { userId } = req.params;
      const { event } = req.body;
      await inviteService.removeInvite(event, userId);
    } catch (error) {
      next(error);
    }
  }

  async seeInvite(req, res, next) {
    try {
      const { inviteId, accept } = req.params;
      const convertedAccept = accept === "true" ? true : false;
      await inviteService.seeInvite(inviteId, convertedAccept);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InviteController();
