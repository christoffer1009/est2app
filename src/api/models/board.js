const mongoose = require("mongoose");

const { Schema } = mongoose;

const boardSchema = new Schema({
  name: {
    type: String,
    // enum: ["Board A", "Board B", "Board C"],
    required: true,
  },
  threads: [{ type: Schema.Types.ObjectId, ref: "thread" }],
});

boardSchema.virtual("url").get(function () {
  return `/board/${this._id}`;
});

exports.Board = mongoose.model("board", boardSchema);
