import Router from 'koa-router';

import { healthController } from 'interfaces/http/controllers';

const router = new Router();

router.get('/health', healthController.healthCheck);

export default router;
