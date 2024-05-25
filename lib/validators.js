const UUIDV4REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Helper function to check if a value is a string
const isString = (value) => typeof value === 'string';

// Helper function to check if a value is a number
const isNumber = (value) => typeof value === 'number' && !isNaN(value);

// Helper function to check if an id is a valid UUID v4
const isUUIDv4 = (id) => typeof id === 'string' && UUIDV4REGEX.test(id);

module.exports = { isString, isNumber, isUUIDv4 };