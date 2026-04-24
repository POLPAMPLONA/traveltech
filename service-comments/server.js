const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

let comments = [];

// GET comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// POST comment
app.post("/comments", (req, res) => {
  const { country, comment } = req.body;

  if (!country || !comment) {
    return res.status(400).json({ error: "country and comment required" });
  }

  comments.push({ country, comment });
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Comments running on ${PORT}`));