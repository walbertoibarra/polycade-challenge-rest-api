import config from 'config';
import _enum from 'domain/enum';
import db from 'infra/sequelize';

const start = async () => {
	await db.sequelize.authenticate();

	// TODO: Add migrations.
	if (config.database.forceSync) {
		console.log('Dropping all tables and creating them again');

		await db.sequelize.createSchema(_enum.Schema.Public);
		await db.sequelize.sync({ force: true });
	}

	console.log('Connected to Postgres DB');
};

const stop = async () => {
	await db.sequelize.close();

	console.log('Disconnected from Postgres DB');
};

export default {
	db,
	start,
	stop
};
