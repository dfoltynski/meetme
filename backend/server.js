require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const router = require("./routes");
const port = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    console.log("Connected to db");
  }
);

app.use("/v1", router);

app.get("/", (req, res) => {
  res.json("asd");
});

const server = app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server is listening on ${port}`);
});

const io = require("socket.io")(server);

const users = new Map();

io.on("connection", (socket) => {
  socket.on("add user", (email) => {
    users.set(email, socket.id);

    console.log(users);
  });

  socket.on("start chat", (message, friend, sender) => {
    console.log(`${sender}: ${message} to ${friend}`);
    console.log("friend id: ", users.get(friend));
    console.log("sender id: ", users.get(sender));
    io.to(users.get(friend)).emit("send message", sender, message, friend);
  });
});
