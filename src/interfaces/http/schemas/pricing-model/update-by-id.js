const { Validator, validate } = require('interfaces/http/schemas/validator');

const validator = new Validator();

const schema = {
	id: {
		type: 'uuid'
	},
	name: {
		type: 'string',
		empty: false
	},
	isDefault: {
		type: 'boolean',
		optional: true
	},

	$$strict: true
};

const compiledSchema = validator.compile(schema);

module.exports = {
	schema,
	validate: (value, shouldThrow) => validate(compiledSchema, value, shouldThrow)
};
