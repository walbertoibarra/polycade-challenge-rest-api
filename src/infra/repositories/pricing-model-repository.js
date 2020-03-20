const { db: { models, Sequelize: { Op } } } = require('infra/database');
const baseRepository = require('infra/repositories/base-repository');

const findById = async (id) => {
	const options = {
		where: {
			id,
			deletedAt: {
				[Op.eq]: null
			}
		},
		limit: 1,
		include: [{
			model: models.priceConfiguration,
			as: 'pricing'
		}]
	};

	const results = await models.pricingModel.findAll(options);

	return results.length ? results[0] : null;
};

const findDefault = async () => {
	const options = {
		where: {
			isDefault: {
				[Op.eq]: true
			},
			deletedAt: {
				[Op.eq]: null
			}
		}
	};

	return models.pricingModel.findOne(options);
};

module.exports = {
	...baseRepository(models.pricingModel),
	findById,
	findDefault
};
