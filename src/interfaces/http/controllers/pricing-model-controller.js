const HttpStatus = require('http-status-codes');

const {
	create: createPricingModel,
	list: listPricingModels,
	updateById: updatePricingModel
} = require('app/pricing-model');
const { findById: findPricingModel } = require('domain/pricing-model');
const { pricingModelMappers } = require('interfaces/http/mappers');
const {
	pricingModel: {
		create: createSchema,
		findById: findByIdSchema,
		updateById: updateByIdSchema
	}
} = require('interfaces/http/schemas');
const { priceConfigurationRepository } = require('infra/repositories');

const create = async (ctx) => {
	const data = pricingModelMappers.createMapper(ctx);

	createSchema.validate(data);

	const model = await createPricingModel(data);

	ctx.set({
		'Location': `/pricing-models/${model.id}`
	});
	ctx.status = HttpStatus.CREATED;
	ctx.body = model;
};

const find = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await listPricingModels();
};

const findById = async (ctx) => {
	const data = pricingModelMappers.findByIdMapper(ctx);

	findByIdSchema.validate(data);

	let model = await findPricingModel(data.id);

	ctx.status = HttpStatus.OK;
	ctx.body = model;
};

const updateById = async (ctx) => {
	const data = pricingModelMappers.updateByIdMapper(ctx);

	updateByIdSchema.validate(data);

	const model = await updatePricingModel(data);

	ctx.status = HttpStatus.OK;
	ctx.body = model;
};

module.exports = {
	create,
	find,
	findById,
	updateById
};
