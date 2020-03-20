const HttpStatus = require('http-status-codes');

const {
	create: createPriceConfigurationModel,
	listByPricingModel: listPriceConfigurationsByPricingModelId
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

const findByPricingModelId = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await listPriceConfigurationsByPricingModelId(ctx.params.pmId);
};

module.exports = {
	create,
	findByPricingModelId
};
