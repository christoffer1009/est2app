const { Author } = require("../models/author");
const { Thread } = require("../models/thread");
// const async = require("async");

// Display list of all Authors.
exports.author_list = (req, res) => {
  Author.find()
    .sort([["last_name", "ascending"]])
    .exec(function (err, list_authors) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("author_list", {
        title: "Author List",
        author_list: list_authors,
      });
    });
};

exports.author_detail = function (req, res, next) {
  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.params.id).exec(callback);
      },
      // author_threads: function (callback) {
      //   Thread.find({ author: req.params.id }, "title text").exec(callback);
      // },
    },
    function (err, results) {
      if (err) {
        return next(err);
      } // Error in API usage.
      if (results.author == null) {
        // No results.
        var err = new Error("Author not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("author_detail", {
        title: "Author Detail",
        author: results.author,
        // author_threads: results.author_threads,
        author_threads: [],
      });
    }
  );
};

// // Display Author create form on GET.
// exports.author_create_get = function (req, res) {
//   res.send("NOT IMPLEMENTED: Author create GET");
// };

// // Handle Author create on POST.
// exports.author_create_post = function (req, res) {
//   res.send("NOT IMPLEMENTED: Author create POST");
// };

// // Display Author delete form on GET.
// exports.author_delete_get = function (req, res) {
//   res.send("NOT IMPLEMENTED: Author delete GET");
// };

// // Handle Author delete on POST.
// exports.author_delete_post = function (req, res) {
//   res.send("NOT IMPLEMENTED: Author delete POST");
// };

// // Display Author update form on GET.
// exports.author_update_get = function (req, res) {
//   res.send("NOT IMPLEMENTED: Author update GET");
// };

// // Handle Author update on POST.
// exports.author_update_post = function (req, res) {
//   res.send("NOT IMPLEMENTED: Author update POST");
// };
