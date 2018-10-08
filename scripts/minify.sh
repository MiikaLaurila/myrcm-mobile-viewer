#!/bin/bash

cd js/
java -jar ../minifiers/closure.jar --js_output_file=myrcm-mobile-min.js '**.js' '!**-min.js' --create_source_map '%outname%.map'

echo "" >> myrcm-mobile-min.js
echo "//# sourceMappingURL=../js/myrcm-mobile-min.js.map" >> myrcm-mobile-min.js

cd ..
cd style/

rm styles.css
cat reset.css index.css > styles.css