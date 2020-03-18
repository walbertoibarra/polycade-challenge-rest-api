const HttpStatus = require('http-status-codes');

const pricingModel = require('app/pricing-model');
const { pricingModelMappers } = require('interfaces/http/mappers');
const {
	pricingModel: {
	  create: createSchema
	}
} = require('interfaces/http/schemas');

const find = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await pricingModel.list();
};

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

module.exports = {
	create,
	find
};
