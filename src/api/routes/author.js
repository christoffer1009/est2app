const express = require("express");
const router = express.Router();
const {
  author_list,
  //   author_create_get,
  //   author_create_post,
  //   author_delete_get,
  //   author_delete_post,
  //   author_update_get,
  //   author_update_post,
  author_detail,
} = require("../controllers/author");
// GET request for list of all Authors.
router.get("/authors", author_list);

// GET request for creating a Board. NOTE This must come before route that displays Boards (uses id).
// router.get("/board/create", board_create_get);

// //POST request for creating board.
// router.post("/board/create", board_create_post);

// // GET request to delete board.
// router.get("/board/:id/delete", board_delete_get);

// // POST request to delete board.
// router.post("/board/:id/delete", board_delete_post);

// // GET request to update board.
// router.get("/board/:id/update", board_update_get);

// // POST request to update board.
// router.post("/board/:id/update", board_update_post);

// GET request for one author.
router.get("/author/:id", author_detail);

module.exports = router;
