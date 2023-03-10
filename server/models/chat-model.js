const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
  user1Id: { type: Schema.Types.ObjectId, required: true },
  user2Id: { type: Schema.Types.ObjectId, required: true },
  messages: {
    type: [
      {
        content: String,
        senderId: Schema.Types.ObjectId,
        date: Date,
        read: { type: Boolean, default: false },
      },
    ],
    required: false,
    default: [],
  },
});

module.exports = model("Chat", ChatSchema);
