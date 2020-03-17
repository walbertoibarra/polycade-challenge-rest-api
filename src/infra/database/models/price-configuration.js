const sequelize = require('sequelize');

class PriceConfiguration extends sequelize.Model {
	static init (sequelize, Sequelize) {
		return super.init({
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(128),
				allowNull: false
			},
			value: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		}, {
			modelName: 'priceConfiguration',
			sequelize,
			tableName: 'PriceConfiguration'
		});
	}

	static associate ({ priceConfiguration, pricingModel }) {
		priceConfiguration.belongsTo(pricingModel, {
			foreignKey: 'priceModelId'
		});
	}
}

module.exports = PriceConfiguration;
