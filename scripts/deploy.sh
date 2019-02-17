#!/bin/bash

echo pwd
# We are at ./

cd js/
# We are at ./js/

sed -i -e 's/192.168.1.69:6969/cors.myrcm-mobile.tk/g' myrcm-mobile-view.js
java -jar ../minifiers/closure.jar --js_output_file=myrcm-mobile-min.js '**.js' '!**-min.js' --create_source_map '%outname%.map'

echo "" >> myrcm-mobile-min.js
echo "//# sourceMappingURL=../js/myrcm-mobile-min.js.map" >> myrcm-mobile-min.js

cd ..
cd style/

rm styles.css
cat reset.css index.css > styles.css

cd ..
# We are at ./
version=`date '+%Y-%m-%d_%H:%M:%S'`
sed -i -e "s/.js\"/.js?v=$version\"/g" index.html
sed -i -e "s/.css/.css?v=$version/g" index.html

mkdir build
cp -R img build/img

mkdir build/js
cp js/myrcm-mobile-min.js build/js/myrcm-mobile-min.js

mkdir build/style
cp style/styles.css build/style/styles.css

cp index.html build/index.html

cd build/
tar -cf deployment.tar *
scp -i ~/.ssh/id_rsa -P 10050 deployment.tar web-service@95.216.20.157:/home/web-service/static/
ssh -p 10050 web-service@95.216.20.157 'sh untar.sh'
cd ..

sed -i -e "s/.css?v=$version/.css/g" index.html
sed -i -e "s/.js?v=$version\"/.js\"/g" index.html

cd js/
# We are at ./js/

sed -i -e 's/cors.myrcm-mobile.tk/192.168.1.133:6969/g' myrcm-mobile-view.js

cd ..
# We are at ./

rm -R build
