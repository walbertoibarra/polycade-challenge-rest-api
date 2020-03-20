const HttpStatus = require('http-status-codes');

const { machineMappers } = require('interfaces/http/mappers');
const {
	machine: {
		create: createSchema
	}
} = require('interfaces/http/schemas');
const { machineRepository } = require('infra/repositories');

const create = async (ctx) => {
	const data = machineMappers.createMapper(ctx);

	createSchema.validate(data);

	const model = await machineRepository.create(data);

	ctx.set({
		'Location': `/pricing-models/${model.id}`
	});
	ctx.status = HttpStatus.CREATED;
	ctx.body = model;
};

module.exports = {
	create
};
