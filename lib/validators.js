/**
 * Conversion rates from given currencies to USD
 */
const conversionRates = {
  USD: {
    AUD: 1.35,
    EUR: 0.85
  },
  AUD: {
    USD: 0.74,
    EUR: 0.63
  },
  EUR: {
    USD: 1.18,
    AUD: 1.59
  }
};

const UUIDV4REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

 // Rounds to 2 decimal places
const roundToTwoDecimalPlaces = (number) => {
  return Math.round(number * 100) / 100;
};

// Helper function to check if a value is a string
const isString = (value) => typeof value === 'string';

// Helper function to check if a value is a number
const isNumber = (value) => typeof value === 'number' && !isNaN(value);

// Helper function to check if an id is a valid UUID v4
const isUUIDv4 = (id) => typeof id === 'string' && UUIDV4REGEX.test(id);

module.exports = { isString, isNumber, isUUIDv4, roundToTwoDecimalPlaces, conversionRates};