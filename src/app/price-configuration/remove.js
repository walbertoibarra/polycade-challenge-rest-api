const { findById: findPriceConfigurationModelById } = require('domain/price-configuration');
const { findById: findPricingModelById } = require('domain/pricing-model');
const { priceConfigurationRepository } = require('infra/repositories');

const remove = async (pricingModelId, priceConfigurationId) => {
	// Validate PM exists.
	await findPricingModelById(pricingModelId);

	// Validate PC exists.
	await findPriceConfigurationModelById(priceConfigurationId);

	return priceConfigurationRepository.deleteById(priceConfigurationId);
};

module.exports = {
	remove
};
