const app = require('app');
const client = require('../client');
const truncate = require('../truncate');
const createPricingModel = require('../factories/create-pricing-model');
const createPriceConfigurationModel = require('../factories/create-price-configuration-model');

describe('Price configuration', () => {
	describe('Delete', () => {
		beforeAll(async () => {
			await app.start();
		});

		beforeEach(async () => {
			await truncate();
		});

		afterAll(async () => {
			await app.stop();
		});

		it('When given unexistent PM or PC, should return 404', async () => {
			expect.assertions(3);

			const pricingModel = await createPricingModel();
			const priceConfiguration = await createPriceConfigurationModel(pricingModel.id);

			try {
				await client({
					method: 'delete',
					url: '/pricing-models/7b24f620-e0d3-4df0-ab6b-bf3850999041/prices/7b24f620-e0d3-4df0-ab6b-bf3850999041'
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}

			try {
				await client({
					method: 'delete',
					url: `/pricing-models/${pricingModel.id}/prices/7b24f620-e0d3-4df0-ab6b-bf3850999041`
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}

			try {
				await client({
					method: 'delete',
					url: `/pricing-models/7b24f620-e0d3-4df0-ab6b-bf3850999041/prices/${priceConfiguration.id}`
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}
		});
	});
});
