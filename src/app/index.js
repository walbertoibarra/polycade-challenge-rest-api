const database = require('infra/database');
const http = require('interfaces/http');
const { server } = require('config');

const start = async () => {
	await Promise.all([
		database.start()
	]);

	// Start interfaces last.
	await Promise.all([
		http.start()
	]);

	console.log(`Started ${server.name} on version ${server.version}`);
};

const stop = async () => {
	// Stop interfaces first.
	await Promise.all([
		http.stop()
	]);

	await Promise.all([
		database.stop()
	]);
};

module.exports = {
	httpApp: http.app,
	start,
	stop
};
