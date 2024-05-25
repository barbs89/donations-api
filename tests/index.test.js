const request = require("supertest");
const app = require('../server/index');

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

});

