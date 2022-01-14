require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json({ limit: "50mb" }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.info("Rick and Morty Characters server is listening.");
});
