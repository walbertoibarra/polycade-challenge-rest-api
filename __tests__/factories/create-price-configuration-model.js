const faker = require('faker');

const { db: { models } } = require('infra/database');

const getData = (pricingModelId, data) => {
	const defaultData = {
		price: +faker.commerce.price(),
		name: faker.random.words(),
		value: faker.random.number()
	};

	return { ...defaultData, ...data, pricingModelId };
};

module.exports = async (pricingModelId, data = { }) => {
	const model = await models.priceConfiguration.create(getData(pricingModelId, data));

	return model.toJSON();
};
