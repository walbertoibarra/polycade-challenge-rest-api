const app = require('app');
const client = require('../client');
const truncate = require('../truncate');
const createPricingModel = require('../factories/create-pricing-model');
const createPriceConfiguration = require('../factories/create-price-configuration');

describe('Price configuration', () => {
	describe('List', () => {
		beforeAll(async () => {
			await app.start();
		});

		beforeEach(async () => {
			await truncate();
		});

		afterAll(async () => {
			await app.stop();
		});

		it('When given unexistent PM, should return 404', async () => {
			expect.assertions(1);

			try {
				await client({
					method: 'get',
					url: '/pricing-models/7b24f620-e0d3-4df0-ab6b-bf3850999041/prices'
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}
		});

		it('When given right data, should return associated pricing', async () => {
			let priceConfigurations;
			const pricingModel = await createPricingModel();

			priceConfigurations = await client({
				method: 'get',
				url: `/pricing-models/${pricingModel.id}/prices`
			});

			expect(priceConfigurations).toHaveLength(0);

			await createPriceConfiguration(pricingModel.id);

			priceConfigurations = await client({
				method: 'get',
				url: `/pricing-models/${pricingModel.id}/prices`
			});

			expect(priceConfigurations).toHaveLength(1);
		});
	});
});
