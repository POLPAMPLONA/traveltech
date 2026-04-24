
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let data = [];

app.get("/comments", (req, res) => res.json(data));

app.post("/comments", (req, res) => {
  data.push(req.body);
  res.json({status: "ok"});
});

app.listen(3002, () => console.log("service-comments on 3002"));
