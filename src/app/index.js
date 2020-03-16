import database from 'infra/database';
import http from 'interfaces/http';
import config from 'config';

const start = async () => {
	await Promise.all([
		database.start()
	]);

	// Start interfaces last.
	await Promise.all([
		http.start()
	]);

	console.log(`Started ${config.server.name} on version ${config.server.version}`);
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

export default {
	start,
	stop
};
