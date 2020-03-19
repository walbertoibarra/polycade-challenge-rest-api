const { pricingModelRepository } = require('infra/repositories');

const setDefault = async (id) => {
	const oldDefaultModel = await pricingModelRepository.findDefault();
	const newDefaultModel = await pricingModelRepository.findById(id);

	if (oldDefaultModel) {
		await oldDefaultModel.update({
			isDefault: false
		});
	}

	await newDefaultModel.update({
		isDefault: true
	});

	return newDefaultModel;
};

module.exports = {
	setDefault
};
