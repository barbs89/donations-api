const { v4: uuidv4 } = require('uuid');
const { isValidDonation } = require('../lib/donationUtils');
const { isUUIDv4 } = require('../lib/validators');
const { fetchProfiles, fetchDonations, receivedDonation } = require('../lib/utils');

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

beforeAll(async () => {
  // Fetch profiles and donations
  profiles = await fetchProfiles();
  donations = await fetchDonations();

});

describe('Donations Data', () => {
  test('should have donations data', () => {
    expect(donations).toBeDefined();
    expect(donations.length).toBeGreaterThan(0);
  });

  test('should have correct profile structure', () => {
    for (const donation of donations) {
      expect(donation).toHaveProperty('id');
      expect(donation).toHaveProperty('donorName');
      expect(donation).toHaveProperty('amount');
      expect(donation).toHaveProperty('profileId');
      expect(donation).toHaveProperty('currency');
    }
  });

  test('should have properties with the correct data types', () => {
    for (const donation of donations) {
      expect(typeof donation.id).toBe('string');
      expect(typeof donation.donorName).toBe('string');
      expect(typeof donation.amount).toBe('number');
      expect(typeof donation.profileId).toBe('string');
      expect(typeof donation.currency).toBe('string');
    }
  });
});

describe('Donations UUID Validation', () => {
  test('should have a id property with a valid UUID v4', () => {
    for (const donation of donations) {
      expect(isUUIDv4(donation.id)).toBe(true);
    }
  });

  test('should have a profileId property with a valid UUID v4', () => {
    for (const donation of donations) {
      expect(isUUIDv4(donation.profileId)).toBe(true);
    }
  });
});

describe('isValidDonation Utility Function', () => {
  test('should return true for a valid donation object', () => {
    const validDonation = {
      donorName: 'John Doe',
      amount: 100,
      profileId: '2e90f063-8853-40ee-8ccb-78be3fb79ada',
      currency: 'AUD'
    };
    expect(isValidDonation(validDonation)).toBe(true);
  });

  // Test for invalid donations
  test('should return false if donation is null', () => {
    expect(isValidDonation(null)).toBe(false);
  });

  test('should return false if donation is undefined', () => {
    expect(isValidDonation(undefined)).toBe(false);
  });

  test('should return false if donation is not an object', () => {
    expect(isValidDonation('not an object')).toBe(false);
  });

  test('should return false if donorName is not a string', () => {
    const invalidDonation = {
      donorName: 123,
      amount: 100,
      profileId: '123e4567-e89b-12d3-a456-426614174000',
      currency: 'USD'
    };
    expect(isValidDonation(invalidDonation)).toBe(false);
  });

});

describe('receivedDonation function', () => {

  beforeEach(() => {
    uuidv4.mockClear();
  });
	
  test('should generate UUID v4 and assign correct properties after successful isValidDonation', () => {
		const mockUUID = 'f5a87bb1-8381-4ecf-b5c9-07fbc300766a';
		
    const validDonation = {
      donorName: 'John Doe',
      amount: 100,
      profileId: '2e90f063-8853-40ee-8ccb-78be3fb79ada',
      currency: 'AUD'
    };

    uuidv4.mockReturnValue(mockUUID);

    const result = receivedDonation(validDonation);

    expect(result).toEqual({
      id: mockUUID,
      donorName: 'John Doe',
      amount: 100,
      profileId: '2e90f063-8853-40ee-8ccb-78be3fb79ada',
      currency: 'AUD'
    });

    expect(uuidv4).toHaveBeenCalled();
    expect(isUUIDv4(result.id)).toBe(true); 
  });
});
