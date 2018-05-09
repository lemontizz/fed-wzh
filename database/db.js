var dbConfig = require('./config');
var mongoose = require('mongoose');
var dbUrl = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;

module.exports = mongoose.connect(dbUrl)