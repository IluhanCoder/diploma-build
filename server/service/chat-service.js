const Mongoose = require("mongoose");
const chatModel = require("../models/chat-model");

class ChatService {
  async newMessage(content, senderId, receiverId) {
    let chat = await chatModel.findOne({
      $or: [
        {
          user1Id: senderId,
          user2Id: receiverId,
        },
        {
          user2Id: senderId,
          user1Id: receiverId,
        },
      ],
    });
    if (!chat)
      await chatModel.create({ user1Id: senderId, user2Id: receiverId });
    await chatModel.updateOne(
      {
        $or: [
          {
            user1Id: senderId,
            user2Id: receiverId,
          },
          {
            user2Id: senderId,
            user1Id: receiverId,
          },
        ],
      },
      {
        $push: {
          messages: { content, senderId, date: new Date() },
        },
      }
    );
  }

  async getChat(receiverId, senderId) {
    const convertedReceiverId = Mongoose.Types.ObjectId(receiverId);
    const convertedSenderId = Mongoose.Types.ObjectId(senderId);
    const chat = await chatModel.aggregate([
      {
        $match: {
          $or: [
            { user1Id: convertedReceiverId, user2Id: convertedSenderId },
            { user2Id: convertedReceiverId, user1Id: convertedSenderId },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user1Id",
          foreignField: "_id",
          as: "user1",
        },
      },
      { $unwind: "$user1" },
      {
        $lookup: {
          from: "users",
          localField: "user2Id",
          foreignField: "_id",
          as: "user2",
        },
      },
      { $unwind: "$user2" },
      { $sort: { date: -1 } },
    ]);
    await chatModel.updateOne(
      {
        _id: chat[0]._id,
        messages: { $elemMatch: { read: "false", senderId: receiverId } },
      },
      { $set: { "messages.$[].read": "true" } }
    );
    return chat[0];
  }

  async getUserChats(userId) {
    const convertedUserId = Mongoose.Types.ObjectId(userId);
    const chats = await chatModel.aggregate([
      {
        $match: {
          $or: [{ user1Id: convertedUserId }, { user2Id: convertedUserId }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user1Id",
          foreignField: "_id",
          as: "user1",
        },
      },
      { $unwind: "$user1" },
      {
        $lookup: {
          from: "users",
          localField: "user2Id",
          foreignField: "_id",
          as: "user2",
        },
      },
      { $unwind: "$user2" },
      {
        $addFields: {
          unreadCount: {
            $size: {
              $filter: {
                input: "$messages",
                cond: {
                  $and: [
                    { $eq: ["$$this.read", false] },
                    { $ne: ["$$this.senderId", convertedUserId] },
                  ],
                },
              },
            },
          },
        },
      },
    ]);
    return chats;
  }

  async countUnread(userId) {
    const convertedUserId = Mongoose.Types.ObjectId(userId);
    const data = await chatModel.aggregate([
      {
        $match: {
          $or: [{ user1Id: convertedUserId }, { user2Id: convertedUserId }],
        },
      },
      {
        $project: {
          tempCount: {
            $size: {
              $filter: {
                input: "$messages",
                cond: {
                  $and: [
                    { $eq: ["$$this.read", false] },
                    { $ne: ["$$this.senderId", convertedUserId] },
                  ],
                },
              },
            },
          },
        },
      },
      { $group: { _id: null, unreadCount: { $sum: "$tempCount" } } },
    ]);
    return data[0];
  }
}

module.exports = new ChatService();
