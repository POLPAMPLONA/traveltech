const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

let favorites = [];

// GET favorites
app.get("/favorites", (req, res) => {
  res.json(favorites);
});

// POST favorite
app.post("/favorites", (req, res) => {
  const { country } = req.body;

  if (!country) {
    return res.status(400).json({ error: "country required" });
  }

  favorites.push({ country });
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Favorites running on ${PORT}`));