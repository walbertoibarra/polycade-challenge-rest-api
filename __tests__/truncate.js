const { db: { models } } = require('infra/database');

const truncate = async () => {
	return Promise.all(
		Object
			.values(models)
			.map((model) => {
				return model.destroy({ where: { }, force: true });
			})
	);
};

module.exports = truncate;
