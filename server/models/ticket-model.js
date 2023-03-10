const { Schema, model, Mongoose } = require("mongoose");

//Ticket is a base schema for Ticket and Invite entities
const PropositionSchema = new Schema({
  type: { type: String, required: true },
  senderId: { type: Schema.Types.ObjectId, required: true },
  receiverId: { type: Schema.Types.ObjectId, required: true },
  eventId: { type: Schema.Types.ObjectId, required: true },
  role: { type: String, required: true },
  date: { type: Date, required: true },
  comment: { type: String, required: false },
});

module.exports = model("Ticket", PropositionSchema);
