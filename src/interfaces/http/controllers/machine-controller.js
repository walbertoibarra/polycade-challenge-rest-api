const HttpStatus = require('http-status-codes');

const {
	updatePricingModel
} = require('app/machine');
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

const updateMachinePricingModel = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await updatePricingModel(ctx.params.id, ctx.params.pmId);
};

module.exports = {
	create,
	updateMachinePricingModel
};
