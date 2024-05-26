const { isString, isNumber, isUUIDv4 } = require('./validators')

const isValidDonation = (donation) => {
  // Check if the donation object is not null or undefined
  if (!donation || typeof donation !== 'object') {
    return false;
  }

  // Check if all required properties are included and have the correct types
  return (
    isString(donation.donorName) &&
    isNumber(donation.amount) &&
    isUUIDv4(donation.profileId) &&
    isString(donation.currency)
  );
}

module.exports = { isValidDonation };