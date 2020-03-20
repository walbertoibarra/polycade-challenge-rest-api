const Router = require('koa-router');

const healthRouter = require('interfaces/http/router/health-router');
const machineRouter = require('interfaces/http/router/machine-router');
const pricingRouter = require('interfaces/http/router/pricing-router');

const router = new Router();

// Configure routes.
router
	.use(healthRouter.routes())
	.use(machineRouter.routes())
	.use(pricingRouter.routes());

module.exports = router;
