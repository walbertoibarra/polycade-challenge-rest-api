const app = require('app');
const client = require('../client');
const truncate = require('../truncate');
const createPricingModel = require('../factories/create-pricing-model');

describe('Price configuration', () => {
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

		it('When given no right data, should return 400 status code', async () => {
			expect.assertions(1);

			try {
				await client({
					method: 'post',
					url: '/pricing-models/f3c87e3c-6700-4e61-95ce-9f3ad468a155/prices'
				});
			} catch (error) {
				expect(error.status).toBe(400);
			}
		});

		it('When given nonexistent PM, should return 404', async () => {
			expect.assertions(1);

			try {
				await client({
					method: 'post',
					url: '/pricing-models/f3c87e3c-6700-4e61-95ce-9f3ad468a155/prices',
					data: {
						price: 1,
						name: 'Test',
						value: 1
					}
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}
		});

		it('When given right data, should be returned when asking for its PM', async () => {
			let pricingModel = await createPricingModel();

			await expect(client({
				method: 'post',
				url: `/pricing-models/${pricingModel.id}/prices`,
				data: {
					price: 1,
					name: 'Test',
					value: 1
				}
			})).resolves.toEqual({
				id: expect.any(String),
				price: '1.00',
				name: 'Test',
				value: 1,
				pricingModelId: pricingModel.id,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				deletedAt: null
			});

			pricingModel = await client({
				method: 'get',
				url: `/pricing-models/${pricingModel.id}`
			});

			expect(pricingModel.pricing).toHaveLength(1);
		});
	});
});
