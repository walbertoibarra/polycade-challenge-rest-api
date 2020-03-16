import server from 'interfaces/http/server';

export default {
	start: server.listen,
	stop: server.stop
};
