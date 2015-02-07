#!/bin/sh

mysql -u root -e "DROP DATABASE IF EXISTS tantalum_meta; CREATE DATABASE tantalum_meta;"
mysql -u root tantalum_meta < /home/tallred/tantalum_meta.sql

APP_HOME=/usr/local
TMP_DIR=/tmp

cd ${TMP_DIR}
sudo rm -f master.zip
wget https://github.com/tantalim/example/archive/master.zip
unzip master.zip

cd example-master
npm install
bower install

cd ${APP_HOME}/example-master
sudo rm -Rf ${APP_HOME}/example-master
sudo mv ${TMP_DIR}/example-master ${APP_HOME}/
cd ${APP_HOME}/example-master

cp ${APP_HOME}/example-master/deploy.sh /home/tallred/

echo npm start
