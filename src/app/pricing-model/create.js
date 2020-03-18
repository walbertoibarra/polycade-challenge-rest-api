const { db: { models } } = require('infra/database');
const { setDefault } = require('domain/pricing-model/set-default');

const create = async (data) => {
	const isDefault = data.isDefault;
	const pricingModel = await models.pricingModel.create({ ...data, isDefault: false });

	if (isDefault) {
		await setDefault(pricingModel.id);
	}

	return models.pricingModel.findByPk(pricingModel.id);
};

module.exports = {
	create
};
