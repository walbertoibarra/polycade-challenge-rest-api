const { db: { models, Sequelize: { Op } } } = require('infra/database');
const baseRepository = require('infra/repositories/base-repository');

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
	findDefault
};
