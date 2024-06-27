// const express = require("express");
// const zod = require("zod");
// const app = express();

// const schema = zod.array(zod.number());

// app.use(express.json());

// app.post("/health-checkup", function (req, res) {
//   const kidneys = req.body.kidneys;
//   const responce = schema.safeParse(kidneys);
//   if (!responce.success) {
//     res.send({
//       msg: "something is not right with your responce please recheck",
//     });
//     return;
//   }
//   res.send({
//     responce,
//   });
// });

// app.listen(3000);

// ---------------------------------------------------------------------------

const zod = require("zod");

function validateInput(obj) {
  const schema = zod.object({
    email: zod.string().email(),
    pass: zod.string().min(8),
  });

  const responce = schema.safeParse(obj);
  console.log(responce);
}

validateInput({
  email: "guddu@gmail.com",
  pass: "1783090983",
});
