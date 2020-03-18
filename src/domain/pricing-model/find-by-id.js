const { NotFound } = require('http-errors');

const { db: { models } } = require('infra/database');

const findById = async (id) => {
	const pricingModel = await models.pricingModel.findByPk(id);

	if (!pricingModel) {
		throw NotFound(`Pricing model with id ${id} not found`);
	}

	return pricingModel;
};

module.exports = {
	findById
};
