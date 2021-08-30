const mongoose = require("mongoose");
const { Schema } = mongoose;

const replySchema = new Schema({
  text: { type: String, required: true },
  thread: { type: Schema.Types.ObjectId, ref: "thread", required: true },
  author: { type: Schema.Types.ObjectId, ref: "author", required: true },
  board: { type: Schema.Types.ObjectId, ref: "board", required: true },
});

replySchema.virtual("url").get(function () {
  return `/board/${this.board}/thread/${this.thread}/reply/${this._id}`;
});

exports.Reply = mongoose.model("reply", replySchema);
