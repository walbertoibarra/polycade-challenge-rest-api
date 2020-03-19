const { db: { models, Sequelize: { Op } } } = require('infra/database');
const baseRepository = require('infra/repositories/base-repository');

const findByPricingModelId = async (priceModelId) => {
	const options = {
		where: {
			priceModelId: {
				[Op.eq]: priceModelId
			}
		}
	};

	return models.priceConfiguration.findOne(options);
};

module.exports = {
	...baseRepository(models.priceConfiguration),
	findByPricingModelId
};
