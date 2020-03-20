const deletePricingModel = require('app/machine/delete-pricing-model');
const getPricingModel = require('app/machine/get-pricing-model');
const updatePricingModel = require('app/machine/update-pricing-model');

module.exports = {
	...deletePricingModel,
	...getPricingModel,
	...updatePricingModel
};
