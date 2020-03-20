const { findById: findMachineById } = require('domain/machine');
const { findById: findPricingModelById } = require('domain/pricing-model');

const updatePricingModel = async (machineId, pricingModelId) => {
	// Validate machine exists.
	const machine = await findMachineById(machineId);

	// Validate pricing model exists.
	await findPricingModelById(pricingModelId);

	await machine.update({ pricingModelId });

	return machine;
};

module.exports = {
	updatePricingModel
};
