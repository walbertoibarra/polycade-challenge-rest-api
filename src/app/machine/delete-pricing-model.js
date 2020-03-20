const { findById: findMachineById } = require('domain/machine');
const { findById: findPricingModelById } = require('domain/pricing-model');

const deletePricingModel = async (machineId, pricingModelId) => {
	// Validate machine exists.
	const machine = await findMachineById(machineId);

	// Validate pricing model exists.
	await findPricingModelById(pricingModelId);

	await machine.update({ pricingModelId: null });

	return machine;
};

module.exports = {
	deletePricingModel
};
