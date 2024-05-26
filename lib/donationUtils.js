const { isString, isNumber, isUUIDv4, roundToTwoDecimalPlaces, conversionRates } = require('./validators')
const { getCurrencyByProfile } = require('./profileUtils')

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

// Get currency by donation
const getCurrencyByDonation = (donation) => {
  return donation && isValidDonation(donation) ? donation.currency : null
};

// Convert amount according to rates
const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (fromCurrency === toCurrency) {
    return roundToTwoDecimalPlaces(amount);
  }

  const rate = rates[fromCurrency][toCurrency];
  const convertedAmount = amount * rate;

  return roundToTwoDecimalPlaces(convertedAmount);
};

// Compare currency between donation and profile
const compareCurrency = (donation, profile) => {
  const profileCurrency = getCurrencyByProfile(profile);
  const donationCurrency = getCurrencyByDonation(donation);
  
  if (!profileCurrency || !donationCurrency) {
    throw new Error('Invalid profile or donation currency');
  }

  const donationAmount = donation.amount;
  const convertedAmount = convertCurrency(donationAmount, donationCurrency, profileCurrency, conversionRates);
  
  return convertedAmount
};

module.exports = { isValidDonation, getCurrencyByDonation, compareCurrency };