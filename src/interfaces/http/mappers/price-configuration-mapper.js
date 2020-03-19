const createMapper = ctx => ({
	pricingModelId: ctx.params.pmId,
	price: ctx.request.body.price,
	name: ctx.request.body.name,
	value: ctx.request.body.value
});

module.exports = {
	createMapper
};
