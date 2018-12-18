'use strict'


var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var List = require('../models/list');
var Track = require('../models/track');
var User = require('../models/user');


function saveTrack(req,res){

	var params = req.body;
	

	var track = new Track();
	track.track = params.track;
	track.list =  params.list;
	track.user = req.user.sub;
	track.created_at = moment.utc();
	if(!params.list) return res.status(200).send({message: "debes enviar una lista"});
	track.save((err,trackStored)=>{
		if(err) return res.status(500).send({message : "error al guardar el track"});

		if(!trackStored) return res.status(404).send({message : 'el track no ha sido guardado'});

		return res.status(200).send({ Track : trackStored });
	});
}



module.exports = {
	saveTrack
} 