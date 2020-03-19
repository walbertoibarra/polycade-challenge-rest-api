const Router = require('koa-router');

const { priceConfigurationController, pricingModelController } = require('interfaces/http/controllers');

const pricingModelRouter = new Router({ prefix: '/pricing-models' });
const priceConfigurationRouter = new Router({ prefix: '/prices' });

// Pricing model routes.
pricingModelRouter.get('/', pricingModelController.find);
pricingModelRouter.post('/', pricingModelController.create);
pricingModelRouter.get('/:id', pricingModelController.findById);
pricingModelRouter.put('/:id', pricingModelController.updateById);

// Price configuration routes.
// priceConfigurationRouter.get('/', priceConfigurationController.find);
priceConfigurationRouter.post('/', priceConfigurationController.create);
// priceConfigurationRouter.delete('/:id', priceConfigurationController.remove);

// Mount price configuration routes on pricing model router.
pricingModelRouter.use(
	'/:pmId',
	priceConfigurationRouter.routes(),
	priceConfigurationRouter.allowedMethods()
);

module.exports = pricingModelRouter;
