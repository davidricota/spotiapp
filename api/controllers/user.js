'use strict'
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var List = require('../models/list');
var jwt = require('../services/jwt');
// Metodos de prueba
function home(req, res){
	res.status(200).send({
		message: 'Home'
	});
};

function pruebas(req, res){
	res.status(200).send({
		message: 'Accion de prueba en el servidor de NodeJS'
	});
};
// Registro
function saveUser(req, res){
	var params = req.body;
	var user = new User();

	if(params.name && params.surname && params.nick && params.email && params.password){
		user.name = params.name;
		user.surname = params.surname;
		user.nick = params.nick;
		user.email = params.email;
		user.role = 'ROLE_USER';
		
		//Controlar usuarios duplicados
		User.find({ $or:[
							{email: user.email.toLowerCase()},
							{nick: user.nick.toLowerCase()},
							]}).exec((err,users)=>{
								if(err) return res.status(500).send({message: 'error en la peticion de usuario'})
								
								if(users && users.length >=1){
									return res.status(200).send({message: 'El usuario que intenta registrar ya existe'})
								}else{
									// Cifra y guarda los datos
		bcrypt.hash(params.password,null,null,(err,hash)=>{
			user.password = hash;

			user.save((err, userStored)=>{
				if(err) return res.status(500).send({message: 'Error al guardar el usuario'});
				if(userStored){
					res.status(200).send({user: userStored});
				}else{
					res.status(404).send({message: 'No se ha registrado el usuario'});
				}
			});
		});
								}
							});
		
	}else{
		res.status(200).send({
			message: 'envia todos los campos necesarios'
		});
	}
}
//Login
function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email},(err, user)=>{
		if(err) return res.status(500).send({message: 'Error en la peticion' });

		if(user){
			bcrypt.compare(password,user.password,(err,check)=>{
				if(check){
					if(params.gettoken){
						// generar y devolver token
						return res.status(200).send({
							token: jwt.createToken(user)
						})
					}else{
						// devolver datos usuarios
						user.password = undefined;
						return res.status(200).send({user});
					}
					
				}else{
					return res.status(404).send({message:'El usuario no se ha podido identificar'});
				}
			});
		}else{
				return res.status(404).send({message:'El usuario no se ha podido identificar!!'});

		}
	});
}

// actualizar datos de un usuario

function updateUser(req,res){
	var userId = req.params.id;

	var update = req.body;
//borrar propiedad password
	delete update.password ;

	if(userId != req.user.sub){
		return res.status(500).send({message: 'no tienes permiso para actualizar este usuario'});
	}

	User.find({ $or:[
				{email: update.email.toLowerCase()},
				{nick: update.nick.toLowerCase()}
				]}).exec((err,users)=>{
					var user_isset = false;
					users.forEach((user)=>{
						if(user && user._id != userId) user_isset = true;
					});
					if(user_isset) return res.status(200).send({message: 'los datos ya estan en uso'});
					
					User.findByIdAndUpdate(userId,update,{new: true},(err,userUpdated)=>{
						if(err) return res.status(500).send({message: 'Error en la peticion'});

						if(!userUpdated) return res.status(404).send({message: 'no se ha podido actualizar el usuario'});
						
						return res.status(200).send({user: userUpdated});
					});
				});

	
}



module.exports = {
	home,

	saveUser,
	loginUser,

	updateUser,
	
}