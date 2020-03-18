const app = require('app');
const client = require('../client');
const truncate = require('../truncate');

describe('Pricing model', () => {
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

		it('Should return all records', async () => {
			let list;

			list = await client({
				method: 'get',
				url: '/pricing-models'
			});

			// As we truncate DB, it should be 0.
			expect(list).toHaveLength(0);

			await client({
				method: 'post',
				url: '/pricing-models',
				data: {
					name: 'Test'
				}
			});

			list = await client({
				method: 'get',
				url: '/pricing-models'
			});

			// After adding a new pricing model, it should be 1 now.
			expect(list).toHaveLength(1);
		});
	});
});
