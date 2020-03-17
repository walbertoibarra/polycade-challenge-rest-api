import { db } from 'infra/database';

const list = async () => {
	const options = {
		order: [
			['createdAt', 'DESC']
		]
	};

	return db.models.pricingModel.findAll(options);
};

export default {
	list
};
