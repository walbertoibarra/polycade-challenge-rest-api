const Router = require('koa-router');

const { healthController } = require('interfaces/http/controllers');

const router = new Router();

router.get('/health', healthController.healthCheck);

module.exports = router;
