const express = require("express");
const {
  reply_list,
  //   reply_create_get,
  //   reply_create_post,
  //   reply_delete_get,
  //   reply_delete_post,
  //   reply_update_get,
  //   reply_update_post,
  reply_detail,
} = require("../controllers/reply");
const router = express.Router();

/// BOARD ROUTES ///

// GET request for list of all replys.
router.get("/replies", reply_list);

// GET request for creating a Board. NOTE This must come before route that displays Boards (uses id).
// router.get("/board/create", board_create_get);

//POST request for creating board.
// router.post("/board/create", board_create_post);

// GET request to delete board.
// router.get("/board/:id/delete", board_delete_get);

// POST request to delete board.
// router.post("/board/:id/delete", board_delete_post);

// GET request to update board.
// router.get("/board/:id/update", board_update_get);

// POST request to update board.
// router.post("/board/:id/update", board_update_post);

// GET request for one reply.
router.get("/board/:boardId/tread/:threadId/reply/:id", reply_detail);

module.exports = router;
