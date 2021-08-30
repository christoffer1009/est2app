const mongoose = require("mongoose");
const User = require("../models/user");
const Joi = require("joi");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTRATION
const register = async (req, res) => {
  //validate data
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  //check if email is already in use
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).send({ error: "Email already exists" });

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new user object
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //save user in db
  try {
    const savedUser = await user.save();
    res.send({ _id: user._id, email: user.email, name: user.name });
  } catch (err) {
    return res.status(400).send(error);
  }
};

//LOGIN
const login = async (req, res) => {
  //validate data
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  //check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ error: "Invalid e-mail" });

  //check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ error: "Invalid password" });

  // create and assing a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("Authorization", token).send(token);
};

module.exports = {
  register: register,
  login: login,
};
