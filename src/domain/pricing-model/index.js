const findById = require('domain/pricing-model/find-by-id');
const setDefault = require('domain/pricing-model/set-default');

module.exports = {
	...findById,
	...setDefault
};
