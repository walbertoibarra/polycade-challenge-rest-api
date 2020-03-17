module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('PricingModel', {
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
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			deletedAt: {
				type: Sequelize.DATE
			}
		});

		await queryInterface.createTable('PriceConfiguration', {
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
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			deletedAt: {
				type: Sequelize.DATE
			}
		});

		// Add foreign key.
		await queryInterface.addColumn(
			'PriceConfiguration',
			'priceModelId',
			{
				type: Sequelize.UUID,
				references: {
					model: 'PricingModel',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
			}
		);

		await queryInterface.createTable('Machine', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(128),
				allowNull: false
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			deletedAt: {
				type: Sequelize.DATE
			}
		});

		// Add foreign key.
		await queryInterface.addColumn(
			'Machine',
			'priceModelId',
			{
				type: Sequelize.UUID,
				references: {
					model: 'PricingModel',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
			}
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Machine');
		await queryInterface.dropTable('PriceConfiguration');
		await queryInterface.dropTable('PricingModel');
	}
};
