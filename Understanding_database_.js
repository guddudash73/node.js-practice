const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:Guddu%402303@cluster0.rhndtyz.mongodb.net/userappnew"
);

// const userFormat = mongoose.model("users", {
//   name: String,
//   email: String,
//   password: String,
// });

const userFormat = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const users = mongoose.model("users", userFormat);

app.post("/signin", async function (req, res) {
  const emailId = req.body.email;
  const pass = req.body.password;
  const fullName = req.body.name;

  const existingUser = await users.findOne({ email: emailId });

  if (existingUser) {
    return res.status(403).json({
      error: "Email already Exists",
    });
  }

  const User = new users({
    name: fullName,
    email: emailId,
    password: pass,
  });
  User.save();
  res.status(200).json({
    msg: "User created successfully",
  });
});

app.listen(3000);
// kitty.save().then(() => console.log('meow'));
