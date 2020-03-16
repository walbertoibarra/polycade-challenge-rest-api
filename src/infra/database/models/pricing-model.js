import sequelize from 'sequelize';

class PricingModel extends sequelize.Model {
	static init (sequelize, Sequelize) {
		return super.init({
			id: {
				type: Sequelize.STRING(64),
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(128),
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
