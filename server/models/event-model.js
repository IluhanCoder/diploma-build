const { Schema, model } = require("mongoose");

//EventSchema represents musical event data
const EventSchema = new Schema({
  name: { type: String, required: true, default: "" },
  creatorId: { type: Schema.Types.ObjectId, required: true },
  desc: { type: String, required: true, default: "" },
  rider: { type: String, required: false, default: "" },
  genres: { type: [String], required: true },
  date: { type: Date, required: true },
  adress: { type: String, required: false, default: "" },
  participants: {
    type: [
      {
        _id: Schema.Types.ObjectId,
        name: String,
        role: String,
        rights: Number,
        feedbacked: { type: Boolean, default: false },
      },
    ],
    required: false,
    default: [],
  },
  avatar: { type: String, required: false, default: null },
  songs: { type: [Schema.Types.ObjectId], required: false, default: [] },
  musiciansNeeded: { type: [String], required: false, default: [] },
  isSubmited: { type: Boolean, default: false },
});

module.exports = model("Event", EventSchema);
