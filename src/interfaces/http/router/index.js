import Router from 'koa-router';

import healthRouter from 'interfaces/http/router/health-router';
import pricingRouter from 'interfaces/http/router/pricing-router';

const router = new Router();

// Configure routes.
router
	.use(healthRouter.routes())
	.use(pricingRouter.routes());

export default router;
