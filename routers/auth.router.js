const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserData = require("../schemas/UserData");

const router = express.Router();
router.route("/").get(async (req, res) => {
  res.json({ message: "server active" });
});

router.route("/signup").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const hasUser = await UserData.findOne({ username });

    if (hasUser) {
      return res
        .status(422)
        .json({ message: "User Already exists. Unprocessable entry error" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = new UserData({ username, password: hashedPassword });
    const userCreated = await userData.save();
    const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).json({ username: userCreated.username, accessToken });
  } catch (error) {
    return res.status(500).send();
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await UserData.findOne({ username });
    if (!foundUser) {
      return res
        .status(404)
        .json({ error: { message: "User not registered. Not found error" } });
    }
    const matchPassword = await bcrypt.compare(password, foundUser.password);

    if (matchPassword) {
      const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
      return res
        .status(200)
        .json({ username: foundUser.username, accessToken });
    } else {
      return res.status(401).json({
        message: "The credentials are invalid. Unauthorized access error",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: { message: "Internal server error" } });
  }
});

module.exports = router;
