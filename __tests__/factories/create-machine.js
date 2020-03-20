const faker = require('faker');

const { db: { models } } = require('infra/database');

const getData = (data) => {
	const defaultData = {
		name: faker.random.words()
	};

	return { ...defaultData, ...data };
};

module.exports = async (data = { }) => {
	const model = await models.machine.create(getData(data));

	return model.toJSON();
};
