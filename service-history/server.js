const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

let history = [];

// GET history
app.get("/history", (req, res) => {
  res.json(history);
});

// POST history
app.post("/history", (req, res) => {
  const { country } = req.body;

  if (!country) {
    return res.status(400).json({ error: "country required" });
  }

  history.push({ country });
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`History running on ${PORT}`));