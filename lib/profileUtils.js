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

module.exports = { isValidProfile }