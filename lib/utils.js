const { profiles } = require('../tests/seed/seedTestProfiles')

const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUUIDv4 = (id) => {
  return uuidV4Regex.test(id);
};

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
    console.error('Error fetching profiles:', error.message);
    throw new Error('Failed to fetch profiles');
  }
};

module.exports = {
	isUUIDv4: isUUIDv4,
  getProfileById: getProfileById,
	fetchProfiles: fetchProfiles
};