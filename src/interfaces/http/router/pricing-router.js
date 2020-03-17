import Router from 'koa-router';

import { pricingModelController } from 'interfaces/http/controllers';

const pricingModelRouter = new Router({ prefix: '/pricing-models' });

// Pricing model routes.
pricingModelRouter.get('/', pricingModelController.find);

export default pricingModelRouter;
