const { findById: findMachineById } = require('domain/machine');
const { findById: findPricingModelById } = require('domain/pricing-model');
const { priceConfigurationRepository, pricingModelRepository } = require('infra/repositories');

const getPricingModel = async (machineId) => {
	// Validate machine exists.
	const machine = await findMachineById(machineId);

	let pricingModel;

	try {
		pricingModel = await findPricingModelById(machine.pricingModelId);
	} catch {
		pricingModel = await pricingModelRepository.findDefault();
	}

	const pricing = await priceConfigurationRepository.findByPricingModelId(pricingModel.id);

	pricingModel = pricingModel.toJSON();
	pricingModel.pricing = pricing;

	return pricingModel;
};

module.exports = {
	getPricingModel
};
