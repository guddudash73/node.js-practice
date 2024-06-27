const express = require("express");
const app = express();

const users = [
  {
    name: "Jhon",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  let jhonkidneys = users[0].kidneys;
  let numberOfKidneys = jhonkidneys.length;
  let numberOfHealthyKidneys = jhonkidneys.filter((kid) => {
    return kid.healthy === true;
  });
  numberOfHealthyKidneys = numberOfHealthyKidneys.length;
  let numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });

  res.json({
    isHealthy,
    msg: "done",
  });
});

app.put("/", (req, res) => {
  let isHealthy = req.body.isHealthy;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = isHealthy;
  }
  res.json({});
});

app.delete("/", (req, res) => {
  let newKidneys = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy) {
      newKidneys.push({
        healthy: true,
      });
    }
  }
  users[0].kidneys = newKidneys;
  res.json({});
});

app.listen(3000);
