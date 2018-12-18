'use strict'

var express = require('express');
var TrackController = require('../controllers/track');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');




api.post('/track', md_auth.ensureAuth,TrackController.saveTrack);
/*api.get('/tracks/:page?',md_auth.ensureAuth,TrackController.getTracks);
api.get('/track/:id',md_auth.ensureAuth,TrackController.getTrack);*/



module.exports = api;