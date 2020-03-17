const { db } = require('infra/database');

const list = async () => {
	const options = {
		order: [
			['createdAt', 'DESC']
		]
	};

	return db.models.pricingModel.findAll(options);
};

module.exports = {
	list
};
