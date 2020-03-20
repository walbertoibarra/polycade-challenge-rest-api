const { findById: findPricingModelById } = require('domain/pricing-model');
const { priceConfigurationRepository } = require('infra/repositories');

const listByPricingModel = async (pricingModelId) => {
	// Validate PM exists.
	await findPricingModelById(pricingModelId);

	return priceConfigurationRepository.findByPricingModelId(pricingModelId);
};

module.exports = {
	listByPricingModel
};
