// https://github.com/sequelize/sequelize/issues/3781#issuecomment-104278869
import pg from 'pg';
import Sequelize from 'sequelize';

delete pg.native;

import config from 'config';
import models from 'infra/database/models';

const sequelize = new Sequelize(config.database.options);

const db = {
	sequelize,
	Sequelize,
	models: models(sequelize, Sequelize)
};

module.exports = db;
