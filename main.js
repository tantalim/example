'use strict';

var tantalimServer = require('tantalim-server/server');
var app = tantalimServer.app;

//var config = require('./config');
var path = require('path');
var pathToPublicDir = path.normalize(__dirname + '/node_modules/tantalim-client/public');

tantalimServer.addClientFiles(pathToPublicDir);

tantalimServer.start();
