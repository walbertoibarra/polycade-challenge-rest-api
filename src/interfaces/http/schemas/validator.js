const Validator = require('fastest-validator');
const { BadRequest } = require('http-errors');

const validate = (compiledSchema, value, shouldThrow = true) => {
	let valid = true;
	const errors = [];
	const validOrErrors = compiledSchema(value);

	if (Array.isArray(validOrErrors)) {
		valid = false;
		errors.push(...validOrErrors);
	}

	if (!valid && shouldThrow) {
		const messages = errors.map(e => e.message).join('. ');

		throw new BadRequest(`Field validation failed: ${messages}`);
	}

	return {
		valid,
		errors
	};
};

module.exports = {
	Validator,
	validate
};
