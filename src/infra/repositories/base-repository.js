const { db: { Sequelize: { Op } } } = require('infra/database');

module.exports = (Model) => {
	const create = async (data) => Model.create(data);

	const deleteById = async (id) => {
		const model = await Model.findByPk(id);

		await model.destroy();

		return model;
	};

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

		const results = await Model.findAll(options);

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

		return Model.findAll(options);
	};

	return {
		create,
		deleteById,
		findById,
		list
	};
};
