const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  commenterId: { type: Schema.Types.ObjectId, required: true },
  eventId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = model("Comment", CommentSchema);
