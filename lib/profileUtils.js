const { isNumber, isString, isUUIDv4 } = require('./validators')

const isValidProfile = (profile) => {
  // Check if the profile object is not null or undefined
  if (!profile || typeof profile !== 'object') {
    return false;
  }

  // Check if all required properties are included and have the correct types
  return (
    isUUIDv4(profile.id) &&
    isString(profile.name) &&
    isNumber(profile.total) &&
   (isUUIDv4(profile.parentId) || profile.parentId === null) &&
    isString(profile.currency)
  );
}

// Get profile by arguments received
const getProfileById = (argumentsId, profilesArray) => {
	if (!isUUIDv4(argumentsId)) {
    throw new Error('Invalid UUIDv4 format for profile id');
  }

  return profilesArray.find((profile) => {
    return profile.id === argumentsId;
  });
};

const getCurrencyByProfile = (profile) => {
  return profile && isValidProfile(profile) ? profile.currency : null
};

module.exports = { isValidProfile, getProfileById, getCurrencyByProfile }