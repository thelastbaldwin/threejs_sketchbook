#!/bin/bash

# Run as root, of course.
# if [ "$UID" -ne "$ROOT_UID" ]
# then
# 	echo "Must be root to run this script."
# 	exit $E_NOTROOT
# fi

#npm install

if [-d "./js/third_party"]
then
	mkdir ./js/third_party
fi

cd ./js/third_party
#download jQuery
curl -O http://code.jquery.com/jquery-2.1.1.min.js

#download threeJS
curl -O http://cdnjs.cloudflare.com/ajax/libs/three.js/r68/three.min.js

#download dat.gui
curl -O http://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min.js

#download stats.js
curl -O http://cdnjs.cloudflare.com/ajax/libs/stats.js/r11/Stats.min.js