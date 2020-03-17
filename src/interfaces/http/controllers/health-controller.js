const HttpStatus = require('http-status-codes');

const health = require('app/health');

const healthCheck = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await health.check();
};

module.exports = {
	healthCheck
};
