const app = require('app');
const client = require('../client');
const truncate = require('../truncate');
const createPricingModel = require('../factories/create-pricing-model');

describe('Pricing model', () => {
	describe('Find by id', () => {
		beforeAll(async () => {
			await app.start();
		});

		beforeEach(async () => {
			await truncate();
		});

		afterAll(async () => {
			await app.stop();
		});

		it('When resource does not exist, should return 404', async () => {
			expect.assertions(1);

			try {
				await client({
					method: 'get',
					url: '/pricing-models/7b24f620-e0d3-4df0-ab6b-bf3850999041'
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}
		});

		it('When resource exists, should return price configurations', async () => {
			let pricingModel;

			pricingModel = await createPricingModel({ name: 'Test' });

			// Get the just created resource.
			pricingModel = await client({
				method: 'get',
				url: `/pricing-models/${pricingModel.id}`
			});

			expect(pricingModel).toEqual({
				id: expect.any(String),
				name: 'Test',
				isDefault: expect.any(Boolean),
				pricing: expect.any(Array),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				deletedAt: null
			});
		});
	});
});
