const { findById, setDefault } = require('domain/pricing-model');
const { pricingModelRepository } = require('infra/repositories');

const updateById = async (data) => {
	const { id, isDefault, ...newData } = data;

	// Validate resource exists before updating.
	const pricingModel = await findById(id);

	await pricingModel.update({ ...newData });

	if (isDefault) {
		await setDefault(pricingModel.id);
	}

	return pricingModelRepository.findById(pricingModel.id);
};

module.exports = {
	updateById
};
