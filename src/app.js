const express = require("express");
const mongoose = require("mongoose");
const authorRouter = require("./api/routes/author");
const boardRouter = require("./api/routes/board");
const indexRouter = require("./api/routes/index");
const threadRouter = require("./api/routes/thread");
const replyRouter = require("./api/routes/reply");
const authRouter = require("./api/routes/auth");

// const database = require("./config/database");
const path = require("path");
require("dotenv").config();

// const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use(express.json());

// const mongoURL = `mongodb+srv://admin:3ALcyKvIvE5Ji4gf@cluster0.u1mux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("connected", () => {
  console.log("DB connected!");
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/", authorRouter, boardRouter, indexRouter, threadRouter, replyRouter);
app.use("/api/user", authRouter);

// Initialize the sever
app.listen(PORT, () => {
  console.log(`Sever listening on port: ${PORT}`);
});
