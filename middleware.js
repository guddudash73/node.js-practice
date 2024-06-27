const express = require("express");

const app = express();

app.get("/health-checkup", function (req, res) {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyid = req.query.kidneyid;

  if (username != "guddu" || password != "pass") {
    res.status(400).json({ msg: "somthing up with your inputs " });
    return;
  }

  if (kidneyid != 1 && kidneyid != 2) {
    res.status(400).json({
      msg: "Something is not right with your kidneys",
    });
    return;
  }

  res.json({
    msg: "Your kidney is totally fine",
  });
});

app.listen(3000);
