const path = require('path');

require('dotenv').config({
	debug: process.env.DEBUG,
	path: path.join(__dirname, '../.env')
});

const serverless = require('serverless-http');

const app = require('app');

exports.handler = serverless(app.httpApp);
