const deletePricingModel = require('app/machine/delete-pricing-model');
const updatePricingModel = require('app/machine/update-pricing-model');

module.exports = {
	...deletePricingModel,
	...updatePricingModel
};
