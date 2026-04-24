
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let data = [];

app.get("/history", (req, res) => res.json(data));

app.post("/history", (req, res) => {
  data.push(req.body);
  res.json({status: "ok"});
});

app.listen(3003, () => console.log("service-history on 3003"));
