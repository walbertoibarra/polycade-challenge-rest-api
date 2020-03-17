const config = require('config');
const { Schema } = require('domain/enum');
const db = require('infra/sequelize');

const start = async () => {
	await db.sequelize.authenticate();

	// TODO: Add migrations.
	if (config.database.forceSync) {
		console.log('Dropping all tables and creating them again');

		await db.sequelize.createSchema(Schema.Public);
		await db.sequelize.sync({ force: true });
	}

	console.log('Connected to Postgres DB');
};

const stop = async () => {
	await db.sequelize.close();

	console.log('Disconnected from Postgres DB');
};

module.exports = {
	db,
	start,
	stop
};
