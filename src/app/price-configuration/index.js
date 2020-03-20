const create = require('app/price-configuration/create');
const listByPricingModel = require('app/price-configuration/list-by-pricing-model');
const remove = require('app/price-configuration/remove');

module.exports = {
	...create,
	...listByPricingModel,
	...remove
};
