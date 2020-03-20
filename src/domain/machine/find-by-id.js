const { NotFound } = require('http-errors');

const { machineRepository } = require('infra/repositories');

const findById = async (id) => {
	const machine = await machineRepository.findById(id);

	if (!machine) {
		throw NotFound(`Machine with id ${id} not found`);
	}

	return machine;
};

module.exports = {
	findById
};
