const { priceConfigurationRepository } = require('infra/repositories');

const findByPricingModelId = async (priceModelId) => priceConfigurationRepository.findByPricingModelId(priceModelId);

module.exports = {
	findByPricingModelId
};
