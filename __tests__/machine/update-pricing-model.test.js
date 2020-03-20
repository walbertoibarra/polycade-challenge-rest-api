const app = require('app');
const client = require('../client');
const truncate = require('../truncate');
const { db: { models } } = require('infra/database');
const createPricingModel = require('../factories/create-pricing-model');
const createMachine = require('../factories/create-machine');

describe('Machine', () => {
	describe('Update Pricing Model', () => {
		beforeAll(async () => {
			await app.start();
		});

		beforeEach(async () => {
			await truncate();
		});

		afterAll(async () => {
			await app.stop();
		});

		it('When given unexistent PM or M, should return 404', async () => {
			expect.assertions(3);

			const machine = await createMachine();
			const pricingModel = await createPricingModel();

			try {
				await client({
					method: 'put',
					url: '/machines/7b24f620-e0d3-4df0-ab6b-bf3850999041/prices/7b24f620-e0d3-4df0-ab6b-bf3850999041'
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}

			try {
				await client({
					method: 'put',
					url: `/machines/${machine.id}/prices/7b24f620-e0d3-4df0-ab6b-bf3850999041`
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}

			try {
				await client({
					method: 'put',
					url: `/machines/7b24f620-e0d3-4df0-ab6b-bf3850999041/prices/${pricingModel.id}`
				});
			} catch (error) {
				expect(error.status).toBe(404);
			}
		});

		it('When given right data, should update its assigned PM', async () => {
			let machine = await createMachine();
			const pricingModel1 = await createPricingModel();
			const pricingModel2 = await createPricingModel();

			expect(machine.pricingModelId).toBeNull();

			machine = await client({
				method: 'put',
				url: `/machines/${machine.id}/prices/${pricingModel1.id}`
			});
			expect(machine.pricingModelId).toBe(pricingModel1.id);

			machine = await client({
				method: 'put',
				url: `/machines/${machine.id}/prices/${pricingModel2.id}`
			});
			expect(machine.pricingModelId).toBe(pricingModel2.id);
		});
	});
});
