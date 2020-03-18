const { db: { models, Sequelize: { Op } } } = require('infra/database');

const findDefault = async () => {
	const options = {
		where: {
			isDefault: {
				[Op.eq]: true
			}
		}
	};

	return models.pricingModel.findOne(options);
};

const list = async () => {
	const options = {
		where: {
			deletedAt: {
				[Op.eq]: null
			}
		},
		order: [
			['createdAt', 'DESC']
		]
	};

	return models.pricingModel.findAll(options);
};

module.exports = {
	findDefault,
	list
};
