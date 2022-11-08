"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./routers/auth.router");
const { routeNotFound } = require("./routers/route-not-found.middleware");
const { errorHandler } = require("./routers/error-handler.middleware");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server active" });
});

app.listen(port, () => {
  console.log("Active on port :", port);
});

app.use("/auth", auth);

app.use(routeNotFound);
app.use(errorHandler);
