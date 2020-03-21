const server = require('interfaces/http/server');

module.exports = {
	app: server.app,
	start: server.listen,
	stop: server.stop
};
