var mongodb = require('../database/db');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId

var userSchema = new Schema({
	id: ObjectId,
	username: {type: String},
	password: {type: String},
	email: {type: String}
});

var userModel = mongoose.model('user', userSchema);

module.exports = {
	getUser: function() {
		userModel.find({}, function(err, docs) {
			console.log(err);
			console.log(docs);
		})

		// mongodb.open(function(err, db) {
		// 	if(err) {
		// 		console.log('error');
		// 		console.log(err);
		// 	} else {
		// 		console.log('mongodb open success');
		// 	}
		// })
	}
}