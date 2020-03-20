const HttpStatus = require('http-status-codes');

const {
	create: createPriceConfiguration,
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

	const model = await createPriceConfiguration(data);

	ctx.set({
		'Location': `/pricing-models/${data.pmId}/prices/${model.id}`
	});
	ctx.status = HttpStatus.CREATED;
	ctx.body = model;
};

const deleteById = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await deletePriceConfiguration(ctx.params.pmId, ctx.params.id);
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
