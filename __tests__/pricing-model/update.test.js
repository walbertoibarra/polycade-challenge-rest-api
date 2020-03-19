const app = require('app');
const client = require('../client');
const truncate = require('../truncate');
const createPricingModel = require('../factories/create-pricing-model');

describe('Pricing model', () => {
	describe('Update', () => {
		beforeAll(async () => {
			await app.start();
		});

		beforeEach(async () => {
			await truncate();
		});

		afterAll(async () => {
			await app.stop();
		});

		it('When given a new name, should update that record', async () => {
			let pricingModel = await createPricingModel();

			await client({
				method: 'put',
				url: `/pricing-models/${pricingModel.id}`,
				data: {
					name: 'New name'
				}
			});

			pricingModel = await client({
				method: 'get',
				url: `/pricing-models/${pricingModel.id}`
			});

			expect(pricingModel.name).toBe('New name');
		});
	});
});
