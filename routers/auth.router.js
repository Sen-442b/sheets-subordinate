const express = require("express");
const bcrypt = require("bcrypt");

const UserData = require("../schemas/UserData");

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const hasUser = await UserData.findOne({ username });

    if (hasUser) {
      res.status(422).json({ message: "User Already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = new UserData({ username, password: hashedPassword });
    const userCreated = await userData.save();
    res.status(201).json({});
  } catch (error) {
    res.status(500).send();
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await UserData.findOne({ username });
    if (!foundUser) {
      res.status(404).json({ message: "User not registered. Not found error" });
    }
    const matchPassword = await bcrypt.compare(password, foundUser.password);

    if (matchPassword) {
      res.status(200).json({ username: foundUser.username });
    } else {
      res.status(401).json({
        message: "The credentials are invalid. Unauthorized access error",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
