const axios = require('axios');

const { http } = require('config');

const client = axios.create({
	baseURL: `http://${http.host}:${http.port}/`,
	timeout: 1000
});

// Add a response interceptor.
client.interceptors.response.use(
	response => response.data,
	error => Promise.reject(error.response)
);

module.exports = client;
