const server = require('interfaces/http/server');

module.exports = {
	start: server.listen,
	stop: server.stop
};
