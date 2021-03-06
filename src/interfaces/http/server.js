const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const cache = require('domain/cache');
const httpConfig = require('config/http');
const router = require('interfaces/http/router');
const {
	errorHandlerMiddleware,
	responseHandlerMiddleware
} = require('interfaces/http/middlewares');

const app = new Koa();
let server;

app
	.use(errorHandlerMiddleware())
	.use(responseHandlerMiddleware())
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods());

// The classic 404.
app.use(async (ctx) => {
	ctx.status = 404;
	ctx.body = { };
});

const listen = () => {
	const options = {
		host: httpConfig.host,
		port: httpConfig.port
	};

	return new Promise((resolve, reject) => {
		server = app.listen(options, (error) => {
			if (error) {
				return reject(error);
			}

			// Store the HTTP boot time.
			cache.httpBootTime = new Date().getTime();

			console.log(`Server is listening on http://${options.host}:${options.port}/`);

			return resolve();
		});
	});
};

const stop = () => {
	if (!server) {
		return console.log('Server was not listening for any requests yet');
	}

	return new Promise((resolve) => {
		server.close(() => {
			console.log('Server stopped');
			resolve();
		});
	});
};

module.exports = {
	app,
	listen,
	stop
};
