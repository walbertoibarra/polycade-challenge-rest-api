const createMapper = ctx => ({
	name: ctx.request.body.name,
	isDefault: ctx.request.body.isDefault || false
});

const findByIdMapper = ctx => ({
	id: ctx.params.id
});

const updateByIdMapper = ctx => ({
	id: ctx.params.id,
	name: ctx.request.body.name,
	isDefault: ctx.request.body.isDefault
});

module.exports = {
	createMapper,
	findByIdMapper,
	updateByIdMapper
};
