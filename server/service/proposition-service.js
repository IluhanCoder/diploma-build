const Mongoose = require("mongoose");
const ApiError = require("../exceptions/api-error");
const eventModel = require("../models/event-model");
const ticketModel = require("../models/ticket-model");
const userModel = require("../models/user-model");

class propositionService {
  async newProposition(senderId, receiverId, eventId, role, date, comment) {
    const candidate = await ticketModel.findOne({ senderId, eventId });
    if (candidate != null)
      throw ApiError.BadRequest("Ви вже надіслали пропозицію для цієї події");
    const proposition = await ticketModel.create({
      senderId,
      receiverId,
      eventId,
      role,
      date,
      comment,
      type: "proposition",
    });
    return proposition;
  }

  async getUserPropositions(userId) {
    const convertedUserId = Mongoose.Types.ObjectId(userId);
    const propositions = await ticketModel.aggregate([
      { $match: { receiverId: convertedUserId, type: "proposition" } },
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
    return propositions;
  }

  async getProposition(receiverId, senderId) {
    const convertedReceiverId = Mongoose.Types.ObjectId(receiverId);
    const convertedSenderId = Mongoose.Types.ObjectId(senderId);
    const proposition = await ticketModel.aggregate([
      {
        $match: {
          receiverId: convertedReceiverId,
          senderId: convertedSenderId,
          type: "proposition",
        },
      },
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
    return proposition[0];
  }

  async seeProposition(propositionId, accept) {
    const proposition = await ticketModel.findById(propositionId);
    const sender = await userModel.findById(proposition.senderId);
    if (accept) {
      const convertedSenderId = Mongoose.Types.ObjectId(proposition.senderId);
      await eventModel.updateOne(
        { _id: proposition.eventId.toString() },
        {
          $push: {
            participants: {
              _id: convertedSenderId,
              name: sender.login,
              role: proposition.role,
              rights: 2,
            },
          },
        }
      );
      await eventModel.updateOne(
        { _id: proposition.eventId.toString() },
        { $pull: { musiciansNeeded: proposition.role } }
      );
    }
    await ticketModel.deleteOne({ _id: proposition._id });
  }
}

module.exports = new propositionService();
