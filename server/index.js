require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Home page
 */
app.get("/", (req, res) => {
  res.send("Welcome to the Raisely API");
});

app.listen(PORT, () => {
	console.log(`Raisely example app listening at http://localhost:${PORT}`);
});

module.exports = app;