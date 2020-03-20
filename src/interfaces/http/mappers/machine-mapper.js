const createMapper = ctx => ({
	name: ctx.request.body.name
});

module.exports = {
	createMapper
};
