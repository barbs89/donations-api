const { isValidProfile } = require('../lib/profileUtils');
const { isUUIDv4 } = require('../lib/validators');
const { fetchProfiles, fetchDonations } = require('../lib/utils');

beforeAll(async () => {
  // Fetch profiles and donations
  profiles = await fetchProfiles();
  donations = await fetchDonations();

});

describe('Profiles Data', () => {
	test('should have profiles data', () => {
    expect(profiles).toBeDefined();
    expect(profiles.length).toBeGreaterThan(0);
  });

	test('should have correct profile structure', () => {
    for (const profile of profiles) {
      expect(profile).toHaveProperty('id');
      expect(profile).toHaveProperty('name');
      expect(profile).toHaveProperty('total');
      expect(profile).toHaveProperty('parentId');
      expect(profile).toHaveProperty('currency');
    }
  });

	test('should have properties with the correct data types', () => {
    for (const profile of profiles) {
      expect(typeof profile.id).toBe('string');
      expect(typeof profile.name).toBe('string');
      expect(typeof profile.total).toBe('number');
      expect(profile.parentId === null || typeof profile.parentId === 'string').toBe(true);
      expect(typeof profile.currency).toBe('string');
    }
  });
});

describe('Profiles UUID Validation', () => {
  test('should have a id property with a valid UUID v4', () => {
    for (const profile of profiles) {
      expect(isUUIDv4(profile.id)).toBe(true);
    }
  });

  test('should have a parentId property with a valid UUID v4 or null', () => {
		for (const profile of profiles) {
			// Check if parentId is null or a valid UUID v4
			expect(profile.parentId === null || isUUIDv4(profile.parentId)).toBe(true);
		}
  });
});

describe('isValidProfile function', () => {
  test('should return true for a valid profile object', () => {
    const validProfile = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John Doe',
      total: 100,
      parentId: null,
      currency: 'USD'
    };
    expect(isValidProfile(validProfile)).toBe(true);
  });

  test('should return false if profile object is null', () => {
    expect(isValidProfile(null)).toBe(false);
  });

  test('should return false if profile object is undefined', () => {
    expect(isValidProfile(undefined)).toBe(false);
  });

  test('should return false if profile object is not an object', () => {
    expect(isValidProfile('not an object')).toBe(false);
  });

  test('should return false if total is not a number', () => {
    const invalidTotalProfile = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'John Doe',
      total: 'invalid-total',
      parentId: null,
      currency: 'USD'
    };
    expect(isValidProfile(invalidTotalProfile)).toBe(false);
  });

});