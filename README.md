# Tantalim Web Application Example

This is an example application that you can use as a starting point to create your own [Tantalim](http://www.tantalim.com/) powered web application.

## Prerequisites
* NPM
* MySQL
* Grunt
* [Tantalim Server](https://github.com/tantalim/tantalim-server)
* [Tantalim Client](https://github.com/tantalim/tantalim-client)

### On Ubuntu
```
git clone git@github.com:tantalim/example.git
# or
apt-get install mysql-server
apt-get install unzip
wget https://github.com/tantalim/example/archive/master.zip
unzip master.zip
apt-get install nodejs
ln -s /usr/bin/nodejs /usr/bin/node
apt-get install npm
cd example-master
npm install
npm install -g bower
bower install
mkdir tantalim_modules
cd tantalim_modules
wget https://github.com/tantalim/app-ide/archive/master.zip
unzip master.zip
mv app-ide-master/app/tantalim ./
rm -Rf app-ide-master
rm -f master.zip
nodejs main.js
```

## [http://demo.tantalim.com/](http://demo.tantalim.com/)


## Working on Tantalim Client and Server

See http://www.devthought.com/2012/02/17/npm-tricks/
```
$ cd tantalim-client
# Register tantalim-server on your computer
$ npm link
$ cd ../sample-app
# Create shortcut to tantalim-client
$ npm link tantalim-client
```
