const path = require('path');

require('dotenv').config({
	debug: process.env.DEBUG,
	path: path.join(__dirname, '../.env')
});
