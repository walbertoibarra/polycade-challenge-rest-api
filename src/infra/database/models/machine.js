const sequelize = require('sequelize');

class Machine extends sequelize.Model {
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
			}
		}, {
			modelName: 'machine',
			sequelize,
			tableName: 'Machine'
		});
	}

	static associate ({ machine, pricingModel }) {
		machine.belongsTo(pricingModel, {
			foreignKey: 'pricingModelId'
		});
	}
}

module.exports = Machine;
