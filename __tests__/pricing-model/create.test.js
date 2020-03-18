const app = require('app');
const client = require('../client');
const truncate = require('../truncate');

describe('Pricing model', () => {
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
					url: '/pricing-models'
				});
			} catch (error) {
				expect(error.status).toBe(400);
			}
		});

		it('When given a name, should store it in DB', async () => {
			await expect(client({
				method: 'post',
				url: '/pricing-models',
				data: {
					name: 'Test'
				}
			})).resolves.toEqual({
				id: expect.any(String),
				name: 'Test',
				isDefault: false,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				deletedAt: null
			});
		});

		it('When told it is the new default, it should set it as default', async () => {
			await expect(client({
				method: 'post',
				url: '/pricing-models',
				data: {
					name: 'Test',
					isDefault: true
				}
			})).resolves.toEqual({
				id: expect.any(String),
				name: 'Test',
				isDefault: true,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				deletedAt: null
			});
		});

		it('When told is the new default and there is already another default, it should replace it', async () => {
			await client({
				method: 'post',
				url: '/pricing-models',
				data: {
					name: 'Old default',
					isDefault: true
				}
			});

			// This should replace old one.
			await client({
				method: 'post',
				url: '/pricing-models',
				data: {
					name: 'New default',
					isDefault: true
				}
			});

			const pricingModels = await client({
				method: 'get',
				url: '/pricing-models'
			});

			const defaults = pricingModels.filter(m => m.isDefault);

			expect(defaults).toHaveLength(1);
			expect(defaults[0].name).toBe('New default');
		});
	});
});
