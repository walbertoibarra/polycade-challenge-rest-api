const Router = require('koa-router');

const { pricingModelController } = require('interfaces/http/controllers');

const pricingModelRouter = new Router({ prefix: '/pricing-models' });

// Pricing model routes.
pricingModelRouter.get('/', pricingModelController.find);

module.exports = pricingModelRouter;
