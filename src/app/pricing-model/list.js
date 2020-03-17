import { pricingModelRepository } from 'infra/repositories';

const list = async () => {
	const pricingModels = await pricingModelRepository.list();

	console.log(pricingModels);

	return pricingModels;
};

export default list;
