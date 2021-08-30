const { Thread } = require("../models/thread");
const { Reply } = require("../models/reply");
const { Board } = require("../models/board");
const { Author } = require("../models/author");
// const async = require("async");

// Display list of all Threads.
exports.thread_list = (req, res, next) => {
  Thread.find({})
    .populate("author")
    .exec(function (err, list_threads) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("thread_list", {
        title: "Thread List",
        thread_list: list_threads,
      });
    });
};

// Display detail page for a specific thread.
exports.thread_detail = async function (req, res, next) {
  const thread = await (
    await Thread.findById(req.params.id)
  ).populate("author");
  const replies = await Reply.find({ thread: req.params.id }).populate(
    "author"
  );

  const replies_authors = [];

  res.render("thread_detail", {
    title: thread.title,
    thread: thread,
    replies: replies,
  });

  // async.parallel(
  //   {
  //     thread: function (callback) {
  //       Thread.findById(req.params.id)
  //         .populate("author")
  //         .populate("board")
  //         .exec(callback);
  //     },
  //     replies: function (callback) {
  //       Reply.find({ thread: req.params.id }).exec(callback);
  //     },
  //     // authors: function (callback) {
  //     //   Author.findById().exec(callback);
  //     // },
  //   },
  //   function (err, results) {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (results.thread == null) {
  //       // No results.
  //       const err = new Error("Thread not found");
  //       err.status = 404;
  //       return next(err);
  //     }
  //     // Successful, so render.
  //     res.render("thread_detail", {
  //       title: results.thread.title,
  //       thread: results.thread,
  //       replies: results.replies,
  //     });
  //   }
  // );
};

// Display thread create form on GET.
exports.thread_create_get = function (req, res, next) {
  // res.send("teste");
  // console.log(req.params.boardId);
  // Get all authors and genres, which we can use for adding to our thread.
  async.parallel(
    {
      authors: function (callback) {
        Author.find(callback);
      },
      // board: function (callback) {
      //   Board.findById(req.params.boardId);
      // },
      replies: function (callback) {
        Reply.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("thread_form", {
        title: "Create Thread",
        authors: results.authors,
        // boards: results.boards,
      });
    }
  );
};

exports.thread_create_post = async function (req, res, next) {
  var thread = new Thread({
    title: req.body.title,
    author: req.body.author,
    text: req.body.text,
    board: req.params.boardId,
  });

  await Author.findById(thread.author, function (err, author) {
    thread.author = author;
  });

  await thread.save(function (err) {
    if (err) {
      return next(err);
    }
    //successful - redirect to new book record.
    res.redirect(thread.url);
  });

  // const await;
  // async.parallel(
  //   {
  //     author: function (callback) {
  //       Author.find({ _id: thread.author });
  //     },
  //     board: function (callback) {
  //       Board.find({ _id: thread.board });
  //     },
  //   },
  //   function (err, results) {
  //     if (err) {
  //       return next(err);
  //     }
  //     console.log(results.author);
  //     thread.author = results.author;
  //     thread.save(function (err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       //successful - redirect to new book record.
  //       res.redirect(thread.url);
  //     });
  //   }
  // );
};
