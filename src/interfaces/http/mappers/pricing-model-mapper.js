const createMapper = ctx => ({
	name: ctx.request.body.name,
	isDefault: ctx.request.body.isDefault || false
});

const findByIdMapper = ctx => ({
	id: ctx.params.id
});

module.exports = {
	createMapper,
	findByIdMapper
};
