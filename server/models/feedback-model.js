const { Schema, model, Mongoose } = require("mongoose");

//Ticket is a base schema for Ticket and Invite entities
const FeedbackSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, required: true },
  receiverId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  value: { type: Number, required: true },
});

module.exports = model("Feedback", FeedbackSchema);
