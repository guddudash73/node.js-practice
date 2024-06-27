let express = require("express");
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let app = express();
let jwtpass = "1234567";

app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:Guddu%402303@cluster0.rhndtyz.mongodb.net/userapp"
);

let userformat = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
});

let users = mongoose.model("users", userformat);

let checkUser = async (username) => {
  return await users.findOne({ username: username });
};
let checkPass = async (password) => {
  return await users.findOne({ password: password });
};

app.post("/signup", async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  fullName = req.body.name;

  if (await checkUser(username)) {
    return res.status(403).json({
      msg: "User already exists use signin",
    });
  }

  let user = new users({
    username: username,
    password: password,
    name: fullName,
  });
  user.save();
  let token = jwt.sign({ username: username }, jwtpass);
  res.status(200).json({ msg: "User created successfully", token });
});

app.post("/signin", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!((await checkUser(username)) || (await checkPass(password)))) {
    return res.status(404).json({
      msg: "Check username and password",
    });
  }

  let token = jwt.sign({ username: username }, jwtpass);
  res.status(200).json({
    token,
  });
});

app.get("/users", async (req, res) => {
  let token = req.headers.authorization;
  try {
    let data = jwt.verify(token, jwtpass);
    res.status(200).json({
      users: await users.find({ username: { $ne: data.username } }),
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Incorrect token",
      err,
    });
  }
});

app.listen(3000);
