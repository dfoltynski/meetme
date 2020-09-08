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

const users = [];

io.on("connection", (socket) => {
  console.log(`new user connected.`);
  //   Object.keys(socket).forEach((key) => console.log(key, socket[key]));

  socket.on("add user to array", (email) => {
    // if (email) {
    // if(users.includes(email)) {
    //   console.log(users.filter((user) => user.email === email));

    users.map((user) =>
      user.email === email ? users.push({ email, id: socket.id }) : null
    );

    console.log(users);

    users.push({ email, id: socket.id });
    // }
    // }
  });

  socket.on("start chat", (message, friend) => {
    console.log(`${friend}: ${message}`);
    for (let i = 0; i < users.length; i++) {
      console.log(users[i]);
    }
    // socket.emit("start chat", (message, friend));
  });
});
