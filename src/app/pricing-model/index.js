const create = require('app/pricing-model/create');
const findById = require('app/pricing-model/find-by-id');
const list = require('app/pricing-model/list');

module.exports = {
	...create,
	...findById,
	...list
};
