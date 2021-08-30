const { Board } = require("../models/board");
const { Thread } = require("../models/thread");
// const async = require("async");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

// Display list of all Boards.
exports.board_list = (req, res) => {
  Board.find({}, "name threads")
    .populate("threads")
    .exec(function (err, list_boards) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("board_list", {
        title: "Board List",
        board_list: list_boards,
      });
    });
};

// Display detail page for a specific board.
exports.board_detail = function (req, res, next) {
  async.parallel(
    {
      board: function (callback) {
        Board.findById(req.params.id).exec(callback);
      },

      board_threads: function (callback) {
        Thread.find({ board: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.board == null) {
        // No results.
        var err = new Error("Board not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("board_detail", {
        title: "Board Detail",
        board: results.board,
        board_threads: results.board_threads,
      });
    }
  );
};

// Display board create form on GET.
exports.board_create_get = function (req, res) {
  res.render("board_form", { title: "Create board" });
};

// Handle board create on POST.
exports.board_create_post = [
  // Validate and santize the name field.
  body("name", "Board name required").trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const board = new Board({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("board_form", {
        title: "Create Board",
        board: board,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Board with same name already exists.
      Board.findOne({ name: req.body.name }).exec(function (err, found_board) {
        if (err) {
          return next(err);
        }

        if (found_board) {
          // Board exists, redirect to its detail page.
          res.redirect(found_board.url);
        } else {
          board.save(function (err) {
            if (err) {
              return next(err);
            }
            // board saved. Redirect to board detail page.
            res.redirect(board.url);
          });
        }
      });
    }
  },
];

// Display board delete form on GET.
exports.board_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: board delete GET");
};

// Handle board delete on POST.
exports.board_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: board delete POST");
};

// Display board update form on GET.
exports.board_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: board update GET");
};

// Handle board update on POST.
exports.board_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: board update POST");
};
