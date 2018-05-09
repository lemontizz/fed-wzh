const dbConfig = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbUrl = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;
const mongoose = require('mongoose');

mongoose.connect(dbUrl);

var store = new MongoStore({
	url: dbUrl,
	ttl: 24 * 60 * 60,
	mongooseConnection: mongoose.connection 
});

store.on('connected', function() {
	console.log('connect db success');
});

module.exports = session({
	secret: 'fed',
	resave: true,
	saveUninitialized: true,
    store: store
});



/* mongodb connect */

// const dbConfig = require('./config');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const dbUrl = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;

// var store = new MongoStore({
// 	url: dbUrl,
// 	ttl: 24 * 60 * 60
// });

// store.on('connected', function() {
// 	console.log('connect db success');
// });

// module.exports = session({
// 	secret: 'fed',
// 	resave: true,
// 	saveUninitialized: true,
// 	store: store
// });