const { Board } = require("../models/board");
const { Author } = require("../models/author");
const { Thread } = require("../models/thread");
const { Reply } = require("../models/reply");
// const async = require("async");

exports.index = (req, res) => {
  async.parallel(
    {
      thread_count: function (callback) {
        Thread.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      reply_count: function (callback) {
        Reply.countDocuments({}, callback);
      },
      author_count: function (callback) {
        Author.countDocuments({}, callback);
      },
      board_count: function (callback) {
        Board.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results,
      });
    }
  );
};
