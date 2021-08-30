const express = require("express");
const {
  thread_list,
  thread_create_get,
  thread_create_post,
  //   thread_delete_get,
  //   thread_delete_post,
  //   thread_update_get,
  //   thread_update_post,
  thread_detail,
} = require("../controllers/thread");
const router = express.Router();

/// THREAD ROUTES ///

// GET request for list of all Threads.
router.get("/threads", thread_list);

// GET request for creating a Thread. NOTE This must come before route that displays Thread (uses id).
router.get("/board/:boardId/thread/create", thread_create_get);

//POST request for creating thread.
router.post("/board/:boardId/thread/create", thread_create_post);

// GET request to delete thread.
// router.get("/thread/:id/delete", thread_delete_get);

// POST request to delete thread.
// router.post("/thread/:id/delete", thread_delete_post);

// GET request to update thread.
// router.get("/thread/:id/update", thread_update_get);

// POST request to update thread.
// router.post("/thread/:id/update", thread_update_post);

// GET request for one thread.
router.get("/board/:boardId/thread/:id", thread_detail);

// GET request for list of all thread.
// router.get("/threads", thread_list);

module.exports = router;
