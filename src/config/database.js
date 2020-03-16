import _enum from 'domain/enum';
import lib from 'domain/lib';

const { env } = process;

lib.validator.validateEnvironmentVariables([
	'POSTGRES_HOST',
	'POSTGRES_DB',
	'POSTGRES_USER',
	'POSTGRES_PASSWORD'
]);

const debug = lib.utils.isTrue(env.POSTGRES_DEBUG);

const proxyLog = (executed, v, data) => {
	const { sequelize, ...otherData } = data;

	console.log(executed, otherData);
};

const database = {
	debug,
	// This will drop all tables and create them again (to avoid use of migrations when developing).
	forceSync: lib.utils.isDev() && lib.utils.isTrue(env.POSTGRES_DEV_FORCE_SYNC),
	options: {
		host: env.POSTGRES_HOST,
		port: Number(env.POSTGRES_PORT) || 5432,
		username: env.POSTGRES_USER,
		password: env.POSTGRES_PASSWORD,
		database: env.POSTGRES_DB,
		dialect: 'postgres',
		define: {
			paranoid: true,
			schema: _enum.Schema.Public,
			timestamps: true
		},
		logging: debug ? proxyLog : false,
		benchmark: true,
		pool: {
			max: 5,
			min: 1
		}
	}
};

export default database;
