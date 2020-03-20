const { Validator, validate } = require('interfaces/http/schemas/validator');

const validator = new Validator();

const schema = {
	name: {
		type: 'string',
		max: 128,
		empty: false
	},

	$$strict: true
};

const compiledSchema = validator.compile(schema);

module.exports = {
	schema,
	validate: (value, shouldThrow) => validate(compiledSchema, value, shouldThrow)
};
