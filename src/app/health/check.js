import prettyMilliseconds from 'pretty-ms';

import cache from 'domain/cache';
import config from 'config';
import _enum from 'domain/enum';

// Taken from ActionHero. https://github.com/actionhero/actionhero/blob/master/actions/status.js
const checkRam = () => {
	const ram = {
		consumedMemoryMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
		problems: []
	};

	if (ram.consumedMemoryMb > config.server.node.maxMemoryAllocated) {
		ram.problems.push(`Using ${ram.consumedMemoryMb} MB, which is more than the max ${config.server.node.maxMemoryAllocated} MB of RAM/HEAP`);
	}

	return ram;
};

// https://inadarei.github.io/rfc-healthcheck/#rfc.section.3.1
const check = async () => {
	const ram = checkRam();
	const problems = [
		...ram.problems
	];

	if (problems.length) {
		console.warn(`Node status is: ${_enum.Status.Unhealthy}`, problems);
	}

	return {
		nodeStatus: problems.length
			? _enum.Status.Unhealthy
			: _enum.Status.Healthy,
		problems,
		instance: config.server.node.appInstance,
		uptime: prettyMilliseconds((new Date()).getTime() - cache.httpBootTime),
		name: config.server.name,
		version: config.server.version
	};
};

export default {
	check
};
