const { Environment } = require('domain/enum');
const { name, version } = require('../../package.json');

const { env } = process;

module.exports = {
	name,
	version,
	node: {
		appInstance: env.NODE_APP_INSTANCE || '0',
		debug: env.DEBUG || false,

		// Only allow for specific Node environments.
		env: Object.values(Environment).includes(env.NODE_ENV)
			? env.NODE_ENV
			: Environment.Development,

		// These values are probably good starting points.
		maxMemoryAllocated: Number(env.MAX_MEMORY_ALLOCATED) || 500
	}
};
