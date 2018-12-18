'use strict'

var express = require('express');
var ListController = require('../controllers/list');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');




api.post('/list', md_auth.ensureAuth,ListController.saveList);
api.get('/lists/:page?',md_auth.ensureAuth,ListController.getLists);
api.get('/list/:id',md_auth.ensureAuth,ListController.getList);



module.exports = api;
