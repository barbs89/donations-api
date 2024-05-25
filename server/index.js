require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { profiles } = require('../tests/seed/seedTestProfiles')

const { fetchProfiles } = require('../lib/utils');

/**
 * Home page
 */
app.get("/", (req, res) => {
  res.send("Welcome to the Raisely API");
});

/**
 * Fetch all profiles
 */
 app.get("/profiles", async (req, res) => {
  try {
    const profiles = await fetchProfiles();
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
	console.log(`Raisely example app listening at http://localhost:${PORT}`);
});

module.exports = app;