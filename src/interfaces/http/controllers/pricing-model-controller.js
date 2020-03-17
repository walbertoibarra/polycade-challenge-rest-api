const HttpStatus = require('http-status-codes');

const { list } = require('app/pricing-model');

const find = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await list();
};

module.exports = {
	find
};
