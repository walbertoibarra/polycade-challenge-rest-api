const app = require('app');
const client = require('../client');
const truncate = require('../truncate');
const { db: { models } } = require('infra/database');
const createPricingModel = require('../factories/create-pricing-model');
const createMachine = require('../factories/create-machine');

describe('Machine', () => {
	describe('Get Pricing', () => {
		beforeAll(async () => {
			await app.start();
		});

		beforeEach(async () => {
			await truncate();
		});

		afterAll(async () => {
			await app.stop();
		});

		it('When given unexistent machine, should return 404', async () => {
			expect.assertions(1);
			try {
				await client({
					method: 'get',
					url: '/machines/7b24f620-e0d3-4df0-ab6b-bf3850999041/prices'
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}
		});

		it('When machine has no assigned PM, should return default', async () => {
			const machine = await createMachine();
			const defaultPricingModel = await createPricingModel({ isDefault: true });
			const pricingModel = await client({
				method: 'get',
				url: `/machines/${machine.id}/prices`
			});

			expect(pricingModel.id).toBe(defaultPricingModel.id);
		});

		it('When machine has an assigned PM, should return it', async () => {
			const machine = await createMachine();
			await createPricingModel({ isDefault: true }); // Making sure there is a default.
			const notDefaultPricingModel = await createPricingModel();

			// Assign not default PM.
			await client({
				method: 'put',
				url: `/machines/${machine.id}/prices/${notDefaultPricingModel.id}`
			});

			const pricingModel = await client({
				method: 'get',
				url: `/machines/${machine.id}/prices`
			});

			expect(pricingModel.id).toBe(notDefaultPricingModel.id);
		});
	});
});
