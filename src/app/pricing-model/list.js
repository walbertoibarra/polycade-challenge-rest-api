const { pricingModelRepository } = require('infra/repositories');

const list = async () => {
	const pricingModels = await pricingModelRepository.list();

	return pricingModels;
};

module.exports = {
	list
};
