const pricingModelIds = [
	'4d40de8f-68f8-4160-a83a-665dbc92d154'
];
const priceConfigurationIds = [
	'584c0bee-8c4b-4bc9-be0f-9043e75b0586',
	'598d2888-2ba1-48d2-8e8d-0911a4b0da81',
	'5c900455-72c2-4442-b088-9159ec9163f6'
];

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('PricingModel', [{
			id: pricingModelIds[0],
			name: 'Default',
			isDefault: true,
			createdAt: new Date(),
			updatedAt: new Date()
		}]);

		await queryInterface.bulkInsert('PriceConfiguration', [{
			id: priceConfigurationIds[0],
			price: 3,
			name: '10 minutes',
			value: 10,
			priceModelId: pricingModelIds[0],
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			id: priceConfigurationIds[1],
			price: 5,
			name: '20 minutes',
			value: 20,
			priceModelId: pricingModelIds[0],
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			id: priceConfigurationIds[2],
			price: 15,
			name: '60 minutes',
			value: 60,
			priceModelId: pricingModelIds[0],
			createdAt: new Date(),
			updatedAt: new Date()
		}]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('PriceConfiguration', {
			id: {
				[Sequelize.Op.in]: priceConfigurationIds
			}
		});

		await queryInterface.bulkDelete('PricingModel', {
			id: {
				[Sequelize.Op.in]: pricingModelIds
			}
		});
	}
};
