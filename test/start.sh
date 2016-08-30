#!/bin/bash

killall -9 node
cd /data/production/current/
npm install
npm install -g bower
npm install -g gulp
npm install -g forever
npm install -g newman
bower --allow-root install
forever start -o log.out node_modules/gulp/bin/gulp.js
service nginx restart
