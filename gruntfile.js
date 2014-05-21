'use strict';

module.exports = function (grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodemon: {
            dev: {
                options: {
                    file: 'main.js',
                    args: [],
                    ignoredFiles: ['public/**'],
                    watchedExtensions: ['js', 'html'],
                    nodeArgs: ['--debug'],
                    delayTime: 2,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-nodemon');
//    grunt.loadNpmTasks('grunt-env');

    //Default task(s).
    grunt.registerTask('default', ['nodemon']);
};
