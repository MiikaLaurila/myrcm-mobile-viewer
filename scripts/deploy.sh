#!/bin/bashssh

cd ..
# We are at ./

cd js/
# We are at ./js/

sed -i -e 's/192.168.11.52:6969/cors.myrcm-mobile.tk/g' myrcm-mobile-view.js

cd ..
# We are at ./
version=`date '+%Y-%m-%d_%H:%M:%S'`
sed -i -e "s/.js\"/.js?v=$version\"/g" index.html
sed -i -e "s/.css/.css?v=$version/g" index.html

tar -cf deployment.tar *
scp -P 10050 deployment.tar web-service@95.216.20.157:/home/web-service/static/
ssh -p 10050 web-service@95.216.20.157 'sh untar.sh'

sed -i -e "s/.css?v=$version/.css/g" index.html
sed -i -e "s/.js?v=$version\"/.js\"/g" index.html

cd js/
# We are at ./js/

sed -i -e 's/cors.myrcm-mobile.tk/192.168.11.52:6969/g' myrcm-mobile-view.js

cd ..
# We are at ./

rm deployment.tar
