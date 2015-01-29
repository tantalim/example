# Tantalim Web Application Example

This is an example application that you can use as a starting point to create your own [Tantalim](http://www.tantalim.com/) powered web application.

## Prerequisites
* NPM
* MySQL
* Grunt
* [Tantalim Server](https://github.com/tantalim/tantalim-server)
* [Tantalim Client](https://github.com/tantalim/tantalim-client)

```
git clone git@github.com:tantalim/example.git
cd example
npm install
```

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
