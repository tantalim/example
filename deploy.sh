#!/bin/sh

APP_HOME=/usr/local
TMP_DIR=/tmp

cd ${TMP_DIR}
sudo rm -f master.zip
wget https://github.com/tantalim/example/archive/master.zip
unzip master.zip

cd example-master
npm install
bower install
npm start

sudo chown -R tantalim:tantalim ${APP_HOME}/example-master
sudo rm -Rf ${APP_HOME}/example-master
sudo mv example-master ${APP_HOME}/
cd ${APP_HOME}/example-master
