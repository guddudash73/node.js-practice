const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://admin:Guddu%402303@cluster0.rhndtyz.mongodb.net/userappnew"
);

const User = mongoose.model("User", {
  name: String,
  username: String,
  pasword: String,
});

const app = express();
app.use(express.json());

async function userExists(username, password) {
  // should check in the database
  return await User.findOne({ username: username });
}

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username from the database
    let result = await User.find({ username: { $ne: username } });
    return res.status(200).json({
      result,
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);
