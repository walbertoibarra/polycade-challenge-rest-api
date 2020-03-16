import Router from 'koa-router';

import controllers from 'interfaces/http/controllers';

const router = new Router();

router.get('/health', controllers.healthController.healthCheck);

module.exports = router;
