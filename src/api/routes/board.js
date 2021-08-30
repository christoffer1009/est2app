const express = require("express");
const {
  board_list,
  board_create_get,
  board_create_post,
  board_delete_get,
  board_delete_post,
  board_update_get,
  board_update_post,
  board_detail,
} = require("../controllers/board");
const router = express.Router();

/// BOARD ROUTES ///

// GET request for list of all Boards.
router.get("/boards", board_list);

// GET request for creating a Board. NOTE This must come before route that displays Boards (uses id).
router.get("/board/create", board_create_get);

//POST request for creating board.
router.post("/board/create", board_create_post);

// GET request to delete board.
router.get("/board/:id/delete", board_delete_get);

// POST request to delete board.
router.post("/board/:id/delete", board_delete_post);

// GET request to update board.
router.get("/board/:id/update", board_update_get);

// POST request to update board.
router.post("/board/:id/update", board_update_post);

// GET request for one board.
router.get("/board/:id", board_detail);

module.exports = router;
