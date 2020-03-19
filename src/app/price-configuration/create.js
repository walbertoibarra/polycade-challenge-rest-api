const { findById: findPricingModelById } = require('domain/pricing-model');
const { priceConfigurationRepository } = require('infra/repositories');

const create = async (data) => {
	// Validate PM exists.
	await findPricingModelById(data.pricingModelId);

	return priceConfigurationRepository.create(data);
};

module.exports = {
	create
};
