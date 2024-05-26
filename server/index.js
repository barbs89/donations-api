require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { profiles } = require('../tests/seed/seedTestProfiles')
const { donations } = require('../tests/seed/seedTestDonations')

const { getProfileById } = require('../lib/profileUtils');
const { addDonations, receivedDonation, initializeProfileTotals, findDonationsByProfileId, fetchProfiles } = require('../lib/utils');

// get initial donations array
const profilesArray = profiles;
initializeProfileTotals(profiles, donations)
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
    const getProfiles = await fetchProfiles(profilesArray);
    res.json(getProfiles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Fetch a single profile
 */
app.get("/profiles/:id", (req, res) => {
	const profileId = req.params.id;

	try {
		const foundProfile = getProfileById(profileId, profilesArray);
		if (foundProfile) {
			res.json(foundProfile);
		} else {
			res.status(404).send({ error: 'Profile not found' });
		}
	} catch (error) {
		res.status(400).send({ error: 'Invalid UUID format' });
	}
});

/**
 * Fetch a single profiles donations
 */
app.get("/profiles/:id/donations", (req, res) => {
	const profileId = req.params.id;

  try {
    // Retrieve the profile by ID
    const foundProfile = getProfileById(profileId, profilesArray);

    if (!foundProfile) {
      return res.status(404).send({ error: 'Profile not found' });
    }

    // Retrieve donations associated with the profile ID
    const profileDonations = findDonationsByProfileId(profileId, donationsArray);
    if (!profileDonations || profileDonations.length === 0) {
      return res.status(404).send({ error: 'No donations found for this profile' });
    }

    // Send the retrieved donations
    res.json(profileDonations);
  } catch (error) {
    res.status(400).send({ error: 'Invalid UUID format' });
  }
});

/**
 * Submit a new donation to the profile with the given ID
 */
app.post('/profiles/:id/donations', (req, res) => {
	const newDonation = receivedDonation(req.body);

	try {
			const result = addDonations(newDonation, profilesArray, donationsArray);
			res.status(201).json(result.donation);
	} catch (error) {
			res.status(400).json({ error: error.message });
	}
});

/**
 * Submit a new donation to the campaign
 */
 app.post("/donations", (req, res) => {
  const newDonation = receivedDonation(req.body);

	try {
			const result = addDonations(newDonation, profilesArray, donationsArray);
			res.status(201).json(result.donation);
	} catch (error) {
			res.status(400).json({ error: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`Raisely example app listening at http://localhost:${PORT}`);
});

module.exports = app;
