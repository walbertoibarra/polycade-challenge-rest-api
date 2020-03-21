const { database } = require('config');

module.exports = {
	...database.options,
	seederStorage: 'sequelize'
};
