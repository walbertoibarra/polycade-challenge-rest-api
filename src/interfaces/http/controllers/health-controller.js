import HttpStatus from 'http-status-codes';

import health from 'app/health';

const healthCheck = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await health.check();
};

export default {
	healthCheck
};
