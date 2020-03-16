import _enum from 'domain/enum';
import serverConfig from 'config/server';

const isDev = () => serverConfig.node.env === _enum.Environment.Development;

const isObject = obj => isTruthy(obj) && (typeof obj === 'object');

const isEmptyObject = obj => isObject(obj) && !Object.keys(obj).length;

const isTrue = obj => (obj || '').toString().toLowerCase() === 'true';

const isTruthy = obj => !!obj;

export default {
	isDev,
	isEmptyObject,
	isTrue,
	isTruthy
};
