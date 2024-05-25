require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { profiles } = require('../tests/seed/seedTestProfiles')
const { donations } = require('../tests/seed/seedTestDonations')

const { getProfileById, findDonationsByProfileId, fetchProfiles } = require('../lib/utils');

// get initial donations array
const donationsArray = donations;

app.use(express.json())

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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Fetch a single profile
 */
 app.get("/profiles/:id", (req, res) => {
	try {
		const foundProfile = getProfileById(req.params.id, profiles);
		if (foundProfile) {
			res.json(foundProfile);
		} else {
			res.status(404).send({ error: 'Profile not found' });
		}
	} catch (error) {
		res.status(400).send({ error: 'Invalid UUID format' }); // Bad request due to invalid UUID format
	}
});

/**
 * Fetch a single profiles donations
*/
app.get("/profiles/:id/donations", (req, res) => {
	const profileId = req.params.id;

  try {
    // Retrieve the profile by ID
    const foundProfile = getProfileById(profileId, profiles);
    if (!foundProfile) {
      return res.status(404).send({ error: 'Profile not found' });
    }

    // Retrieve donations associated with the profile ID
    const profileDonations = findDonationsByProfileId(profileId, donationsArray);
    if (!profileDonations) {
      return res.status(404).send({ error: 'No donations found for this profile' });
    }

    // Send the retrieved donations
    res.json(profileDonations);
  } catch (error) {
    // Handle errors (e.g., invalid UUID format)
    res.status(400).send({ error: 'Invalid UUID format' });
  }
});

app.listen(PORT, () => {
	console.log(`Raisely example app listening at http://localhost:${PORT}`);
});

module.exports = app;