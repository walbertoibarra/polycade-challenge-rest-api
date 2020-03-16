import path from 'path';

require('dotenv').config({
	debug: process.env.DEBUG,
	path: path.join(__dirname, '../.env')
});

import application from 'app';
import config from 'config';

const gracefulShutdown = () => {
	// Force the process to not exit instantly.
	process.stdin.resume();

	console.log('Will try to clean up before shutting down');

	application
		.stop()
		.then(() => {
			console.log('Gracefully shut down');
			process.exit(0);
		})
		.catch((error) => {
			console.error(error.message);
			process.exit(1);
		});
};

const setupProcessEvents = () => {
	// Kill signals.
	process.once('SIGTERM', gracefulShutdown);
	process.once('SIGUSR1', gracefulShutdown);
	process.once('SIGUSR2', gracefulShutdown);

	// Any uncaught exception.
	process.once('uncaughtException', (error) => {
		console.error(`Caught exception: ${error.message}`);

		gracefulShutdown();
	});

	// Any promise that wasn't properly handled.
	process.on('unhandledRejection', (reason) => {
		console.error(`Unhandled Rejection: ${reason.message}`);
	});

	// `Control + C` event, there is nothing to do here.
	process.once('SIGINT', () => {
		console.error('Caught `Ctrl-C` event, exiting right away');
		process.exit(2);
	});
};

// Set up all process events listeners.
setupProcessEvents();

// Log the configuration (env vars with defaults) to be used.
console.log('Configuration used on this instance', config);

// Actually start the server.
application
	.start()
	.catch((error) => {
		console.error(error.message);

		gracefulShutdown();
	});
