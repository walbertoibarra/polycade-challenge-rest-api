const app = require('app');
const client = require('../client');
const truncate = require('../truncate');

describe('Machine', () => {
	describe('Create', () => {
		beforeAll(async () => {
			await app.start();
		});

		beforeEach(async () => {
			await truncate();
		});

		afterAll(async () => {
			await app.stop();
		});

		it('When given no name, should return 400 status code', async () => {
			expect.assertions(1);

			try {
				await client({
					method: 'post',
					url: '/machines'
				});
			} catch (error) {
				expect(error.status).toBe(400);
			}
		});

		it('When given a name, should store it in DB', async () => {
			await expect(client({
				method: 'post',
				url: '/machines',
				data: {
					name: 'Test'
				}
			})).resolves.toEqual({
				id: expect.any(String),
				name: 'Test',
				pricingModelId: null,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				deletedAt: null
			});
		});
	});
});
