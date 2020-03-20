const { findById: findMachineById } = require('domain/machine');
const { findById: findPricingModelById } = require('domain/pricing-model');
const { pricingModelRepository } = require('infra/repositories');

const getPricingModel = async (machineId) => {
	// Validate machine exists.
	const machine = await findMachineById(machineId);

	let pricingModel;

	try {
		pricingModel = await findPricingModelById(machine.pricingModelId);
	} catch {
		pricingModel = await pricingModelRepository.findDefault();
	}

	return pricingModel;
};

module.exports = {
	getPricingModel
};
