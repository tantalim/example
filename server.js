'use strict';

var tantalimServer = require('tantalim-server/server');
var LocalStrategy = require('passport-local').Strategy;

var path = require('path');
var rootPath = path.normalize(__dirname);

var config = {
    environment: process.env.NODE_ENV || 'development',
    appRoot: rootPath,
    /**
     * The secret should be set to a non-guessable string for this application.
     * Use http://www.md5hashgenerator.com/ to generate your own!
     */
    sessionSecret: 'sY4YHfADjoue1Tv8rMj1OcU6hPHN3Bb7fAFIjoft',
    // The name of the MongoDB collection to store sessions in
//    sessionCollection: 'sessions'

    db: {
        driver: 'mysql',
        server: 'localhost'
    },
    passportStrategy: new LocalStrategy(
        function (username, password, done) {
            if (username === 'demo' && password === 'demo') {
                return done(null, {
                    id: 'demo',
                    displayName: 'Demo User',
                    provider: 'tantalim'
                });
            }
            return done(null, false, {message: 'use "demo/demo" when logging into Tantalim Example'});
        }
    ),
    locals: {
        title: 'Tantalim Example'
        //css: '/assets/desktop.css'
    }
};

switch (config.environment) {
    case 'integration':
        break;
    case 'qa':
        break;
    case 'preprod':
        break;
    case 'production':
        break;
    default:
        config.db.database = 'tantalum_meta';
        config.db.username = 'root';
        config.db.password = '';
}

tantalimServer.setup(config);

tantalimServer.start();
