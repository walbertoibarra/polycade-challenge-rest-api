const validateEnvironmentVariables = (requiredEnvVars) => {
	requiredEnvVars.forEach((variable) => {
		if (process.env[variable] === undefined) {
			throw new Error(`Undefined required environment variable: ${variable}`);
		}
	});
};

export default {
	validateEnvironmentVariables
};
