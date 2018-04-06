const dbConfig = require('../config/config').db;
const pgPromise = require('pg-promise');
// const promise = require('bluebird');

function camelizeColumns(data) {
	const template = data[0];
	for (let prop in template) {
		const camel = pgPromise.utils.camelize(prop);
		if (!(camel in template)) {
			for (let i = 0; i < data.length; i++) {
				let d = data[i];
				d[camel] = d[prop];
				delete d[prop];
			}
		}
	}
}


// initOptions = 
// pgp = require('pg-promise')(initOptions),
// config = include('config/config'),
// db = (function (env) {
// 	return pgp(config.db[env]);
// }('local'));



const pgp = pgPromise({
	capSQL: true
});
const db = (pgp(dbConfig['local']));
exports.pgp = pgp;

// DB query 실행
exports.executeQueryAny = (query, queryParams) => {
	return db.any(query, queryParams);
}

// DB query 실행
exports.executeQueryNone = (query, queryParams) => {
	return db.none(query, queryParams);
}

// DB query 실행
exports.executeQueryOne = (query, queryParams) => {
	return db.one(query, queryParams);
}

// DB query 실행
exports.executeQueryOneOrNone = (query, queryParams) => {
	return db.oneOrNone(query, queryParams);
}

exports.executeBatchQuery = (querySet) => {
	return db.tx(t => t.batch(querySet.map(value => t.none(value.query, value.params))));
}

