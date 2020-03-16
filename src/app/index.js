import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import http from 'interfaces/http';
import { name, version } from '../../package.json';

const app = new Koa();
const router = new Router();

router
	.get('/', (ctx, next) => {
		ctx.body = 'hello world';
	});

app
	.use(bodyParser())
	.use(router.routes());

const start = async () => {
	// Start interfaces last.
	await Promise.all([
		http.start()
	]);

	console.log(`Started ${name} on version ${version}`);
};

const stop = async () => {
	// Stop interfaces first.
	await Promise.all([
		http.stop()
	]);
};

export default {
	start,
	stop
};
