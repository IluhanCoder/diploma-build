const chatService = require("../service/chat-service");
const ChatService = require("../service/chat-service");

class ChatController {
  async newMessage(req, res, next) {
    try {
      const { content, senderId, receiverId } = req.body;
      await ChatService.newMessage(content, senderId, receiverId);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async getChat(req, res, next) {
    try {
      const { receiverId, senderId } = req.params;
      const chat = await ChatService.getChat(receiverId, senderId);
      return res.status(200).json(chat);
    } catch (error) {
      next(error);
    }
  }

  async getUserChats(req, res, next) {
    try {
      const { userId } = req.params;
      const chats = await chatService.getUserChats(userId);
      return res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }

  async countUnread(req, res, next) {
    try {
      const { userId } = req.params;
      const chats = await chatService.countUnread(userId);
      return res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatController();
