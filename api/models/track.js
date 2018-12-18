'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrackSchema = Schema({
		name: String,
		track: String,
		created_at: String,
		list: String,
		user: {type: Schema.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Track', TrackSchema);