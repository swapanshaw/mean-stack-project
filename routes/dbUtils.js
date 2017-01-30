const db_url = 'mongodb://pgfinder:pg@ds133279.mlab.com:33279/pg-locator';

const mongojs = require('mongojs');
let db = mongojs(db_url);

module.exports = db;