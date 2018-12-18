'use strict'

var express = require('express');

var TokenController = require('../controllers/token');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//api.get('/token/:client_id/:client_secret', md_auth.ensureAuth,TokenController.getToken );
api.get('/token/:client_id/:client_secret', TokenController.getToken );

module.exports = api;