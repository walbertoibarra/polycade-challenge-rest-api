const { Validator, validate } = require('interfaces/http/schemas/validator');

const validator = new Validator();

const schema = {
	pricingModelId: {
		type: 'uuid'
	},
	price: {
		type: 'number'
	},
	name: {
		type: 'string',
		max: 128,
		empty: false
	},
	value: {
		type: 'number',
		integer: true
	},

	$$strict: true
};

const compiledSchema = validator.compile(schema);

module.exports = {
	schema,
	validate: (value, shouldThrow) => validate(compiledSchema, value, shouldThrow)
};
