
const { v4: uuidv4 } = require('uuid');
const { isUUIDv4 } = require('../lib/validators')
const { isValidDonation, compareCurrency } = require('../lib/donationUtils')
const { profiles } = require('../tests/seed/seedTestProfiles')
const { donations } = require('../tests/seed/seedTestDonations')

const initializeProfileTotals = (profilesArray, donationsArray) => {
	donationsArray.forEach(donation => {
			const profileIndex = getProfileIndexByProfileId(donation.profileId, profilesArray);
			if (profileIndex !== -1) {
					updateProfileTotalDonations(profilesArray, profileIndex, donation);
			}
	});
};

// Get all profiles
const fetchProfiles = async (profilesArray) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(profilesArray);
      }, 1000);
    });
  } catch (error) {
    throw new Error('Failed to fetch profiles');
  }
};

// find all donations by profile id
const findDonationsByProfileId = (profileId, donations) => {
  return donations.filter((donation) => {
    return donation.profileId === profileId;
  });
};

// get profile index with donation id
const getProfileIndexByDonationId = (donation, profiles) => {
  return profiles.findIndex((profile) => {
    return profile.id === donation.profileId;
  });
};

// get profile index with profile id
const getProfileIndexByProfileId = (profileId, profiles) => {
	return profiles.findIndex((profile) => {
			return profile.id === profileId;
	});
};

// Update profile total amount donations
const updateProfileTotalDonations = (profilesArray, profileIndex, donation) => {

	const profile = profilesArray[profileIndex];
	const convertedAmount = compareCurrency(donation, profile);

	profilesArray[profileIndex].total += convertedAmount;
	return profilesArray[profileIndex];
};

// Get all donations
const fetchDonations = async () => {
	try {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(donations);
			}, 1000);
		});
	} catch (error) {
    throw new Error('Failed to fetch donations');
	}
};

// Received donation
const receivedDonation = (donationArguments) => {
  try {
    if (!isValidDonation(donationArguments)) {
      return false;
    }
    return {
      id: uuidv4(),
      donorName: donationArguments.donorName,
      amount: donationArguments.amount,
      profileId: donationArguments.profileId,
      currency: donationArguments.currency
    };
  } catch (error) {
    throw new Error('Unable to receive donation');
  }
};

// Add donation
const addDonations = (donationArguments, profilesArray, donationsArray) => {
	const donation = receivedDonation(donationArguments);

	if (!donation) {
			throw new Error('Invalid donation data');
	}

	const profileIndex = getProfileIndexByProfileId(donation.profileId, profilesArray);

	if (profileIndex === -1) {
		throw new Error('Profile not found');
	}

	donationsArray.push(donation);
	const updatedProfile = updateProfileTotalDonations(profilesArray, profileIndex, donation);

	return { donation, profile: updatedProfile };
};

module.exports = {
	isUUIDv4: isUUIDv4,
  receivedDonation: receivedDonation,
  getProfileIndexByDonationId: getProfileIndexByDonationId,
	getProfileIndexByProfileId: getProfileIndexByProfileId,
	addDonations: addDonations,
	initializeProfileTotals: initializeProfileTotals,
  updateProfileTotalDonations: updateProfileTotalDonations,
  findDonationsByProfileId: findDonationsByProfileId,
	fetchProfiles: fetchProfiles,
	fetchDonations: fetchDonations
};
