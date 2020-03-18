const create = require('app/pricing-model/create');
const list = require('app/pricing-model/list');
const updateById = require('app/pricing-model/update-by-id');

module.exports = {
	...create,
	...list,
	...updateById
};
