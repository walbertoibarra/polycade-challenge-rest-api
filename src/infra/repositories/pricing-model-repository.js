const { db: { models, Sequelize: { Op } } } = require('infra/database');

const create = async (data) => models.pricingModel.create(data);

const findById = async (id) => {
	const options = {
		where: {
			id,
			deletedAt: {
				[Op.eq]: null
			}
		},
		limit: 1
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
	create,
	findById,
	findDefault,
	list
};
