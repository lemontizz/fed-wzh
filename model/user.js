var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	id: ObjectId,
	username: {type: String},
	password: {type: String},
	email: {type: String},
	role: {type: String}
}, { timestamps: true });

var userModel = mongoose.model('users', userSchema);

module.exports = {
	Schema: userSchema,
	Model: userModel,
	ObjectId: ObjectId
}