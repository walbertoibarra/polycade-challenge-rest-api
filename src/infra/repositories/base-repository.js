const { db: { Sequelize: { Op } } } = require('infra/database');

module.exports = (model) => {
	const create = async (data) => model.create(data);

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

		const results = await model.findAll(options);

		return results.length ? results[0] : null;
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

		return model.findAll(options);
	};

	return {
		create,
		findById,
		list
	};
};
