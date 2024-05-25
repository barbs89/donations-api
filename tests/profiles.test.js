const { isUUIDv4 } = require('../lib/validators');
const { fetchProfiles } = require('../lib/utils');

beforeAll(async () => {
  // Fetch profiles
  profiles = await fetchProfiles();

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
