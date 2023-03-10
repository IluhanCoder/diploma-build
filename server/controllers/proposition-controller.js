const propositionService = require("../service/proposition-service");

class PropositionController {
  async eventPropose(req, res, next) {
    try {
      const { proposerId, receiverId, eventId, role, comment } = req.body;
      const currentDate = new Date();
      await propositionService.newProposition(
        proposerId,
        receiverId,
        eventId,
        role,
        currentDate,
        comment
      );
    } catch (error) {
      next(error);
    }
  }

  async getUserPropositions(req, res, next) {
    try {
      const { userId } = req.params;
      const propositions = await propositionService.getUserPropositions(userId);
      return res.status(200).json(propositions);
    } catch (error) {
      next(error);
    }
  }

  async getPropsition(req, res, next) {
    try {
      const { receiverId, senderId } = req.params;
      const proposition = await propositionService.getProposition(
        receiverId,
        senderId
      );
      return res.status(200).json(proposition);
    } catch (error) {
      next(error);
    }
  }

  async seeProposition(req, res, next) {
    try {
      const { propositionId, accept } = req.params;
      const convertedAccept = accept === "true" ? true : false;
      await propositionService.seeProposition(propositionId, convertedAccept);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PropositionController();
