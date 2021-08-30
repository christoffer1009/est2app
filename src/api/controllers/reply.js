const { Reply } = require("../models/reply");
const { Board } = require("../models/board");
// const async = require("async");

// Display list of all Replies.
exports.reply_list = (req, res, next) => {
  Reply.find({}, "text author")
    .populate("author")
    .exec(function (err, list_replies) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("reply_list", {
        title: "Reply List",
        reply_list: list_replies,
      });
    });
};

// Display detail page for a specific Reply.
exports.reply_detail = function (req, res, next) {
  async.parallel(
    {
      reply: function (callback) {
        Reply.findById(req.params.id).exec(callback);
      },
      reply_board: function (callback) {
        Board.find({ id: req.params.boardId }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      } // Error in API usage.
      if (results.reply == null) {
        // No results.
        var err = new Error("Reply not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("reply_detail", {
        title: "Reply Detail",
        reply: results.reply,
        reply_board: results.reply_board,
      });
    }
  );
};
