const { Schema, model, Mongoose } = require("mongoose");

//Ticket is a base schema for Ticket and Invite entities
const PropositionSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  key: { type: String, required: true },
  tempo: { type: Number, required: true },
  signature: { type: String, required: true },
  pdf: { type: [{ file: String, desc: String }], required: false },
  audio: { type: [{ file: String, desc: String }], required: false },
  lyrics: { type: String, required: false, default: "" },
  desc: { type: String, required: false },
});

module.exports = model("Song", PropositionSchema);
