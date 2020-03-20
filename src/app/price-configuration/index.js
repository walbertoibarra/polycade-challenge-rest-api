const create = require('app/price-configuration/create');
const listByPricingModel = require('app/price-configuration/list-by-pricing-model');

module.exports = {
	...create,
	...listByPricingModel
};
