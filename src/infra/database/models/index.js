import fs from 'fs';
import path from 'path';

import lib from 'domain/lib';

const models = { };

export default (sequelize, Sequelize) => {
	if (lib.utils.isEmptyObject(models)) {
		fs
			.readdirSync(path.join(__dirname))
			.filter(file => (!!file.indexOf('.')) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
			.forEach((file) => {
				const modelDir = path.join(__dirname, file);
				const Model = require(modelDir);
				const model = Model.init(sequelize, Sequelize);

				models[model.name] = model;
			});

		// Create relationships.
		Object
			.values(models)
			.filter(model => typeof model.associate === 'function')
			.forEach(model => model.associate(models));
	}

	return models;
};
