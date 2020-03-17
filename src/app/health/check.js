const prettyMilliseconds = require('pretty-ms');

const cache = require('domain/cache');
const { server: config } = require('config');
const { Status } = require('domain/enum');

// Taken from ActionHero. https://github.com/actionhero/actionhero/blob/master/actions/status.js
const checkRam = () => {
	const ram = {
		consumedMemoryMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
		problems: []
	};

	if (ram.consumedMemoryMb > config.node.maxMemoryAllocated) {
		ram.problems.push(`Using ${ram.consumedMemoryMb} MB, which is more than the max ${config.node.maxMemoryAllocated} MB of RAM/HEAP`);
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
		console.warn(`Node status is: ${Status.Unhealthy}`, problems);
	}

	return {
		nodeStatus: problems.length
			? Status.Unhealthy
			: Status.Healthy,
		problems,
		instance: config.node.appInstance,
		uptime: prettyMilliseconds((new Date()).getTime() - cache.httpBootTime),
		name: config.name,
		version: config.version
	};
};

module.exports = {
	check
};
