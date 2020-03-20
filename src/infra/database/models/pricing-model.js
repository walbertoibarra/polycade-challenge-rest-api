const sequelize = require('sequelize');

class PricingModel extends sequelize.Model {
	static init (sequelize, Sequelize) {
		return super.init({
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(128),
				allowNull: false
			},
			isDefault: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		}, {
			modelName: 'pricingModel',
			sequelize,
			tableName: 'PricingModel'
		});
	}

	static associate ({ priceConfiguration, pricingModel }) {
		pricingModel.hasMany(priceConfiguration, {
			foreignKey: 'pricingModelId',
			as: 'pricing'
		});
	}
}

module.exports = PricingModel;
