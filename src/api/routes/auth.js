const router = require("express").Router();
const { register, login } = require("../controllers/auth");
const authorization = require("../authorization/authorization");

router.post("/register", register);
router.post("/login", login);
router.get("/teste", authorization, (req, res, next) => {
  res.json({ title: "title", data: "data you cannot access" });
});

module.exports = router;
