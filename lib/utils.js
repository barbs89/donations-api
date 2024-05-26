
const { v4: uuidv4 } = require('uuid');
const { isUUIDv4 } = require('../lib/validators')
const { isValidDonation } = require('../lib/donationUtils')
const { profiles } = require('../tests/seed/seedTestProfiles')
const { donations } = require('../tests/seed/seedTestDonations')

const getProfileById = (id, elementList) => {
	if (!isUUIDv4(id)) {
    throw new Error('Invalid UUIDv4 format for profile id');
  }
  return elementList.find((element) => {
    return element.id === id;
  });
};

const fetchProfiles = async () => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(profiles);
      }, 1000);
    });
  } catch (error) {
    throw new Error('Failed to fetch profiles');
  }
};

const findDonationsByProfileId = (profileId, donations) => {
  return donations.filter((donation) => {
    return donation.profileId === profileId;
  });
};

const getIndexById = (id, elementList) => {
  return elementList.findIndex((element) => {
    return element.id === Number(id);
  });
};


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

// const receivedDonation = (donationArguments) => {
//   if (!isValidDonation(donationArguments)) {
//     throw new Error('Invalid donation arguments');
//   }

//   const { donorName, amount, profileId, currency } = donationArguments;

//   return {
//     id: uuidv4(),
//     donorName,
//     amount,
//     profileId,
//     currency
//   };
// };

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

const updateProfileTotal = (id, queryArguments, elementList) => {
  const elementIndex = getIndexById(id, elementList);
  if (elementIndex === -1) {
    throw new Error('updateElement must be called with a valid id parameter');
  }
  if (queryArguments.id) {
    queryArguments.id = Number(queryArguments.id);
  }
  Object.assign(elementList[elementIndex], queryArguments);
  return elementList[elementIndex];
};

// const seedDonations = (donationsArray, newDonation) => {
//   if (newDonation) {
//     return donationsArray.push(receivedDonation(newDonation));
//   } 
// };

module.exports = {
	isUUIDv4: isUUIDv4,
  receivedDonation: receivedDonation,
  getIndexById: getIndexById,
  getProfileById: getProfileById,
  updateProfileTotal: updateProfileTotal,
  findDonationsByProfileId: findDonationsByProfileId,
	fetchProfiles: fetchProfiles,
	fetchDonations: fetchDonations
};
