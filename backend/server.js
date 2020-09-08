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
  //   Object.keys(socket).forEach((key) => console.log(key, socket[key]));

  socket.on("add user", (email, id) => {
    // users.map((user) => {
    //   if (user.email !== email) {
    // users[users.indexOf(user)] = { email, id: socket.id };
    // users.push({ email, id: socket.id });
    //   } else if (user.id !== socket.id) {
    // users[users.indexOf(user)] = { id: socket.id };
    // users[users.indexOf(user)] = { email, id: socket.id };
    // users.push({ id });
    //   }
    // });

    users.forEach((user) => {
      if (user.email === email) {
        user.id = socket.id;
      } else {
        users.push({ email, id: socket.id });
      }
    });

    users.map(
      (user) => {
        console.log(user);
      }
      //   user.email == email ? null : users.push({ email, id: socket.id })
    );

    // users.push({ email, id: socket.id });
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
