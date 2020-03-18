const HttpStatus = require('http-status-codes');

const { utils: { isNullOrUndefined } } = require('domain/lib');

const responseHandlerMiddleware = () => async (ctx, next) => {
	// Set these to avoid setting them in every controller, any errors on any middleware should
	// set the correct status.
	ctx.status = HttpStatus.OK;
	ctx.set('Content-Type', 'application/json');

	ctx.body = { };

	await next();

	if (isNullOrUndefined(ctx.body)) {
		ctx.body = { };
	}
};

module.exports = responseHandlerMiddleware;
