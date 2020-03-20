const { NotFound } = require('http-errors');

const { priceConfigurationRepository } = require('infra/repositories');

const findById = async (id) => {
	const priceConfiguration = await priceConfigurationRepository.findById(id);

	if (!priceConfiguration) {
		throw NotFound(`Price configuration with id ${id} not found`);
	}

	return priceConfiguration;
};

module.exports = {
	findById
};
