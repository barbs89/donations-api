const request = require("supertest");
const app = require('../server/index');

describe('Routes', () => {
	describe('GET /', () => {
		test('server is running on correct port', () => {
			const port = process.env.PORT;
			expect(port).toBe('8080');
		});
	});

});

