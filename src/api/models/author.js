const mongoose = require("mongoose");

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: {
    firstName: { type: String, required: true, maxlength: 100 },
    lastName: { type: String, required: true, maxlength: 100 },
  },
});

// authorSchema.virtual("url").get(() => `/author/${this._id}`);
authorSchema.virtual("url").get(function () {
  return `/author/${this._id}`;
});

// authorSchema
//   .virtual("name")
//   .get(() => `${this.name.firstName} ${this.name.lastName}`);

authorSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

exports.Author = mongoose.model("author", authorSchema);
