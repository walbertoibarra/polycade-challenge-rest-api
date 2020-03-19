const { setDefault } = require('domain/pricing-model/set-default');
const { pricingModelRepository } = require('infra/repositories');

const create = async (data) => {
	const isDefault = data.isDefault;
	const pricingModel = await pricingModelRepository.create({ ...data, isDefault: false });

	if (isDefault) {
		await setDefault(pricingModel.id);
	}

	return pricingModelRepository.findById(pricingModel.id);
};

module.exports = {
	create
};
