'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

// conexion database
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };    
//var mongodbUri = 'mongodb://tito:lodetito1234@ds247690.mlab.com:47690/lodetito';
var mongodbUri = 'mongodb://localhost:27017/spotiapp';
mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri, options)
		.then(() => {
			console.log('la conexion se realizo con exito!!!');

		// Crear servidor
		app.listen(port,() => {
			console.log('Servidor corriendo en http://localhost:3800');
			});
		})
		.catch(err => console.log(err)); 