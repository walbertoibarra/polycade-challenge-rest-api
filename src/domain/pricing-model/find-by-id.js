const { NotFound } = require('http-errors');

const { pricingModelRepository } = require('infra/repositories');

const findById = async (id) => {
	const pricingModel = await pricingModelRepository.findById(id);

	if (!pricingModel) {
		throw NotFound(`Pricing model with id ${id} not found`);
	}

	return pricingModel;
};

module.exports = {
	findById
};
