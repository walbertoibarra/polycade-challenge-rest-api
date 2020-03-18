const create = require('app/pricing-model/create');
const list = require('app/pricing-model/list');

module.exports = {
	...create,
	...list
};
