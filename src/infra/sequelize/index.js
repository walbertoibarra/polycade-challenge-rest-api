// https://github.com/sequelize/sequelize/issues/3781#issuecomment-104278869
const pg = require('pg');
const Sequelize = require('sequelize');

delete pg.native;

const { database: { options: config } } = require('config');
const models = require('infra/database/models');

const sequelize = new Sequelize(config);

const db = {
	sequelize,
	Sequelize,
	models: models(sequelize, Sequelize)
};

module.exports = db;
