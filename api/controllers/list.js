'use strict'

var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

var List = require('../models/list');
var User = require('../models/user');
var Track = require('../models/track');

function saveList(req,res){

	var params = req.body;
	

	if(!params.name) return res.status(200).send({message: "debes enviar un nombre"});
	
	var list = new List();
	list.name = params.name;
	list.user = req.user.sub;
	list.created_at = moment.utc();

	list.save((err,listStored)=>{
		if(err) return res.status(500).send({message : "error al guardar la lista"});

		if(!listStored) return res.status(404).send({message : 'la lista no ha sido guardada'});

		return res.status(200).send({ List : listStored });
	});
}


function getLists(req, res){
	var page =1 ;
	if(req.params.page){
		page = req.params.page;
	}
	var itemsPerPage = 4;

	
		List.find().sort('-created_at').paginate(page, itemsPerPage,(err,lists,total)=>{
			if(err) return res.status(500).send({ message : 'no se puede devolver las listas'});

			if(!lists) return res.status(404).send({ message : 'no hay listas'});

			return res.status(200).send({
				total_items: total,
				pages: Math.ceil(total/itemsPerPage),
				page:page,
				itemsPerPage: itemsPerPage,
				lists

			});
		});
	
}

// conseguir datos de una lista
function getList(req,res){
	
 var idList = req.params.id;

 List.findById(idList,(err,list)=>{
 	if(err) return res.status(500).send({message: 'error en la peticion'});

 	if(!list) return res.status(404).send({message: 'la lista no existe'});
	 
 	trackList(idList).then((value)=>{
		
 		return res.status(200).send({
 			list, 
 			tracks:value.tracks
 			
 		});
 	})

 		
 });
}
 
async function trackList( idList ){

	var tracks = await Track.find({'list': idList}).exec((err, track) => {
 		if(err) return handleError(err);
 		return track;
 	}); 

 	return {
 		tracks : tracks
 	}
}




module.exports = {
	saveList,
	getLists,
	getList
}