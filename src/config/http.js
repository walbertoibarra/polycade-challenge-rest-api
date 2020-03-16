const { env } = process;

const host = env.HTTP_HOST || 'localhost';
const port = Number(env.HTTP_PORT) || 1337;

export default {
	domain: env.HTTP_DOMAIN || `http://${host}:${port}/`,
	host,
	port
};
