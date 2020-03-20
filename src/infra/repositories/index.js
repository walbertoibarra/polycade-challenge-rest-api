const machineRepository = require('infra/repositories/machine-repository');
const priceConfigurationRepository = require('infra/repositories/price-configuration-repository');
const pricingModelRepository = require('infra/repositories/pricing-model-repository');

module.exports = {
	machineRepository,
	priceConfigurationRepository,
	pricingModelRepository
};
