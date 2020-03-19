const { db: { models, Sequelize: { Op } } } = require('infra/database');
const baseRepository = require('infra/repositories/base-repository');

const findByPricingModelId = async (pricingModelId) => {
	const options = {
		where: {
			pricingModelId: {
				[Op.eq]: pricingModelId
			}
		}
	};

	return models.priceConfiguration.findAll(options);
};

module.exports = {
	...baseRepository(models.priceConfiguration),
	findByPricingModelId
};
