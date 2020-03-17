const sequelize = require('sequelize');

class PricingModel extends sequelize.Model {
	static init (sequelize, Sequelize) {
		return super.init({
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(128),
				allowNull: false
			},
			isDefault: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			}
		}, {
			modelName: 'pricingModel',
			sequelize,
			tableName: 'PricingModel'
		});
	}
}

module.exports = PricingModel;
