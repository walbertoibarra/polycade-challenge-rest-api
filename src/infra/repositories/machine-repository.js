const { db: { models } } = require('infra/database');
const baseRepository = require('infra/repositories/base-repository');

module.exports = {
	...baseRepository(models.machine)
};
