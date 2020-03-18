const HttpStatus = require('http-status-codes');

const errorHandlerMiddleware = () => async (ctx, next) => {
	try {
		await next();
	} catch (error) {
		const statusCode = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;

		console.error(error.message, { stack: error.stack, statusCode });

		ctx.status = statusCode;
		ctx.set('Content-Type', 'application/json');
		ctx.body = {
			statusCode,
			errorMessage: error.message
		};
	}
};

module.exports = errorHandlerMiddleware;
