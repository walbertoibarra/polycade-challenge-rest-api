const createMapper = ctx => ({
	name: ctx.request.body.name,
	isDefault: ctx.request.body.isDefault || false
});

module.exports = {
	createMapper
};
