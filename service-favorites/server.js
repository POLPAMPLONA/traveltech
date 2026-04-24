
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let data = [];

app.get("/favorites", (req, res) => res.json(data));

app.post("/favorites", (req, res) => {
  data.push(req.body);
  res.json({status: "ok"});
});

app.listen(3001, () => console.log("service-favorites on 3001"));
