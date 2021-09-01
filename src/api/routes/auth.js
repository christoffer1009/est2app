const router = require("express").Router();
const { register, login } = require("../controllers/auth");
const authorization = require("../authorization/authorization");

router.post("/register", register);
router.post("/login", login);
router.get("/teste", authorization, (req, res, next) => {
  res.send(`<h1>Hello ${req.user._id}</h1>`);
});

module.exports = router;
