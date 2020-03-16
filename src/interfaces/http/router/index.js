import Router from 'koa-router';

import healthRouter from 'interfaces/http/router/health-router';

const router = new Router();

// Configure routes.
router
	.use(healthRouter.routes());

export default router;
