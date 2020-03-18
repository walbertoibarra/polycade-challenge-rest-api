const HttpStatus = require('http-status-codes');

const pricingModel = require('app/pricing-model');
const { pricingModelMappers } = require('interfaces/http/mappers');
const {
	pricingModel: {
		create: createSchema,
		findById: findByIdSchema
	}
} = require('interfaces/http/schemas');
const { priceConfigurationRepository } = require('infra/repositories');

const create = async (ctx) => {
	const data = pricingModelMappers.createMapper(ctx);

	createSchema.validate(data);

	const model = await pricingModel.create(data);

	ctx.set({
		'Location': `/pricing-models/${model.id}`
	});
	ctx.status = HttpStatus.CREATED;
	ctx.body = model;
};

const find = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await pricingModel.list();
};

const findById = async (ctx) => {
	const data = pricingModelMappers.findByIdMapper(ctx);

	findByIdSchema.validate(data);

	let model = await pricingModel.findById(data.id);
	const pricing = await priceConfigurationRepository.findByPricingModelId(model.id);

	model = model.toJSON();
	model.pricing = pricing ? pricing.toJSON() : [];

	ctx.status = HttpStatus.OK;
	ctx.body = model;
};

module.exports = {
	create,
	find,
	findById
};
