const request = require("supertest");
const app = require('../server/index');
const { v4: uuidv4 } = require('uuid');

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

beforeEach(() => {
	uuidv4.mockClear();
});

describe('Routes', () => {
	describe('GET /', () => {
		test('server is running on correct port', () => {
			const port = process.env.PORT;
			expect(port).toBe('8080');
		});
	});
	
	describe('GET /profiles', () => {
		test('should return profiles ', async () => {
			const res = await request(app).get('/profiles')
			expect(res.statusCode).toBe(200);
		});
	});

	describe('GET /profiles/:id', () => {
		test('should return a single profile ', async () => {
			const profileId = "2ad19172-9683-407d-9732-8397d58ddcb2"
			const res = await request(app).get(`/profiles/${profileId}`)
			expect(res.statusCode).toBe(200);
		});
	});

	describe('GET /profiles/:id/donations', () => {
		test('should return a single profile\'s donations', async () => {
			const res = await request(app).get('/profiles')
			expect(res.statusCode).toBe(200);
		});
	});
	
	describe('POST /profiles/:id/donations', () => {
		const profileId = "2ad19172-9683-407d-9732-8397d58ddcb2"
		const mockUUID = 'f5a87bb1-8381-4ecf-b5c9-07fbc300766a';

		test('should create a new donation and respond with status 201 and the updated donations list', async () => {
			uuidv4.mockReturnValue(mockUUID);
	
			const validDonation = {
				donorName: 'John Doe',
				amount: 100,
				profileId: '2ad19172-9683-407d-9732-8397d58ddcb2',
				currency: 'AUD'
			};
	
			const response = await request(app)
				.post(`/profiles/${profileId}/donations`)
				.send(validDonation)
				.expect('Content-Type', /json/)
				.expect(201);

			const expectedDonation = {
				id: mockUUID,
				donorName: 'John Doe',
				amount: 100,
				profileId: '2ad19172-9683-407d-9732-8397d58ddcb2',
				currency: 'AUD'
			};

			// Compare JSON strings for deep equality
			expect(JSON.stringify(response.body)).toContain(JSON.stringify(expectedDonation))
	
			expect(uuidv4).toHaveBeenCalled();
		});
	
		test('should respond with status 400 if the donation is invalid', async () => {
			const invalidDonation = {
				donorName: '',
				amount: 100,
				profileId: 'invalid-profile-id',
				currency: 'AUD'
			};
	
			await request(app)
				.post(`/profiles/${profileId}/donations`)
				.send(invalidDonation)
				.expect(400);
		});
	});
	

});
