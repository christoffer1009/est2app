const mongoose = require("mongoose");
const { Schema } = mongoose;

const threadSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "author", required: true },
  board: { type: Schema.Types.ObjectId, ref: "board", required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: "reply" }],
});

threadSchema.virtual("url").get(function () {
  return `/board/${this.board}/thread/${this._id}`;
});

exports.Thread = mongoose.model("thread", threadSchema);
