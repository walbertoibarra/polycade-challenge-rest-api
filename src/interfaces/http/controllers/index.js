const healthController = require('interfaces/http/controllers/health-controller');
const machineController = require('interfaces/http/controllers/machine-controller');
const priceConfigurationController = require('interfaces/http/controllers/price-configuration-controller');
const pricingModelController = require('interfaces/http/controllers/pricing-model-controller');

module.exports = {
	healthController,
	machineController,
	priceConfigurationController,
	pricingModelController
};
