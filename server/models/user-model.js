const { Schema, model, ObjectId, Mongoose } = require("mongoose");
const eventModel = require("./event-model");

const UserSchema = new Schema(
  {
    login: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    bio: { type: String, required: false },
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
    cell: { type: String, required: true },
    city: { type: String, required: true },
    gender: { type: String, required: true },
    avatar: { type: String, required: false },
    isActivated: { type: String, default: true },
    activationLink: { type: String },
    eventInvites: { type: [Schema.Types.ObjectId], required: false },
    eventPropositions: { type: [Schema.Types.ObjectId], required: false },
    desc: { type: String, required: false, default: "" },
    genres: { type: [String], required: true },
    instruments: { type: [String], required: false },
  },
  { strict: false }
);

module.exports = model("User", UserSchema);
