const HttpStatus = require('http-status-codes');

const {
	create: createPriceConfigurationModel,
	listByPricingModel: listPriceConfigurationsByPricingModelId,
	remove: deletePriceConfiguration
} = require('app/price-configuration');
const { priceConfigurationMappers } = require('interfaces/http/mappers');
const {
	priceConfiguration: {
		create: createSchema
	}
} = require('interfaces/http/schemas');

const create = async (ctx) => {
	const data = priceConfigurationMappers.createMapper(ctx);

	createSchema.validate(data);

	const model = await createPriceConfigurationModel(data);

	ctx.set({
		'Location': `/pricing-models/${data.pmId}/prices/${model.id}`
	});
	ctx.status = HttpStatus.CREATED;
	ctx.body = model;
};

const deleteById = async (ctx) => {
	const model = await deletePriceConfiguration(ctx.params.pmId, ctx.params.id);

	console.log(model.toJSON());

	ctx.status = HttpStatus.OK;
	ctx.body = model;
};

const findByPricingModelId = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await listPriceConfigurationsByPricingModelId(ctx.params.pmId);
};

module.exports = {
	create,
	deleteById,
	findByPricingModelId
};
