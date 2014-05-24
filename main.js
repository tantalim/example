'use strict';

var tantalimServer = require('tantalim-server/server');

var path = require('path');
var rootPath = path.normalize(__dirname);

var config = {
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
    app: {
        name: 'Tantalim Example'
    }
};

switch (process.env.NODE_ENV) {
    case 'development':
        config.db = {
            database: 'tantalim_sample',
            username: 'root',
            password: null
        }
        break;
    // Add in other environments here
    case 'integration':
        break;
    case 'qa':
        break;
    case 'preprod':
        break;
    case 'production':
        break;
}

tantalimServer.setup(config);

tantalimServer.start();
