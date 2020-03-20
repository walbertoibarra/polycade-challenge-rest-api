const Router = require('koa-router');

const { machineController } = require('interfaces/http/controllers');

const machineRouter = new Router({ prefix: '/machines' });

// Pricing model routes.
machineRouter.post('/', machineController.create);
machineRouter.put('/:id/prices/:pmId', machineController.updateMachinePricingModel);
// machineRouter.delete('/:id/prices/:pmId', machineController.removePricingModel);
// machineRouter.get('/:id/prices', machineController.listPricingModels);

module.exports = machineRouter;
