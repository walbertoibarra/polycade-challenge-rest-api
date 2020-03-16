import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import cache from 'domain/cache';
import httpConfig from 'config/http';
import router from 'interfaces/http/router';

const app = new Koa();
let server;

app
	// .use(errorHandlerMiddleware())
	// .use(responseHandlerMiddleware())
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

export default {
	listen,
	stop
};
