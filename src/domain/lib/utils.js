const _enum = require('domain/enum');
const serverConfig = require('config/server');

const isDev = () => serverConfig.node.env === _enum.Environment.Development;

const isTruthy = obj => !!obj;

const isObject = obj => isTruthy(obj) && (typeof obj === 'object');

const isEmptyObject = obj => isObject(obj) && !Object.keys(obj).length;

const isTrue = obj => (obj || '').toString().toLowerCase() === 'true';

module.exports = {
	isDev,
	isEmptyObject,
	isTrue,
	isTruthy
};
