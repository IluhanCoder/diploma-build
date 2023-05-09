const Mongoose = require("mongoose");
const ApiError = require("../exceptions/api-error");
const eventModel = require("../models/event-model");
const ticketModel = require("../models/ticket-model");
const userModel = require("../models/user-model");

class InviteService {
  async newInvite(proposerId, receiverId, eventId, role, date, comment) {
    const candidate = await ticketModel.findOne({ proposerId, eventId });
    if (candidate != null)
      throw ApiError.BadRequest("Ви вже запросили користувача на цю подію");
    const invite = await ticketModel.create({
      type: "invite",
      senderId: proposerId,
      receiverId,
      eventId,
      role,
      date,
      comment,
    });
    return invite;
  }

  async getUserInvites(userId) {
    const convertedUserId = Mongoose.Types.ObjectId(userId);
    const invites = await ticketModel.aggregate([
      { $match: { receiverId: convertedUserId, type: "invite" } },
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "sender",
        },
      },
      { $unwind: "$sender" },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" },
    ]);
    return invites;
  }

  async getInvite(receiverId, eventId) {
    const invite = await ticketModel.findOne({
      receiverId,
      eventId,
      type: "invite",
    });
    return invite;
  }

  async seeInvite(inviteId, accept) {
    const invite = await ticketModel.findById(inviteId);
    const receiver = await userModel.findById(invite.receiverId);
    if (accept) {
      const convertedReceiverId = Mongoose.Types.ObjectId(invite.receiverId);
      await eventModel.updateOne(
        { _id: Mongoose.Types.ObjectId(invite.eventId) },
        {
          $push: {
            participants: {
              _id: convertedReceiverId,
              name: receiver.login,
              role: invite.role,
              rights: 2,
            },
          },
        }
      );
      await eventModel.updateOne(
        { _id: invite.eventId.toString() },
        { $pull: { musiciansNeeded: invite.role } }
      );
    }
    await ticketModel.deleteOne({ _id: invite._id });
  }

  async eventInviteExists(eventId) {
    const isExist = await ticketModel.exists({ eventId: eventId });
    return isExist;
  }
}

module.exports = new InviteService();
