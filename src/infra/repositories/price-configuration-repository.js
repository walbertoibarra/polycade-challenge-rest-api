const { db: { models, Sequelize: { Op } } } = require('infra/database');

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
	findByPricingModelId
};
