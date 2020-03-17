import HttpStatus from 'http-status-codes';

import { list } from 'app/pricing-model';

const find = async (ctx) => {
	ctx.status = HttpStatus.OK;
	ctx.body = await list();
};

export default {
	find
};
