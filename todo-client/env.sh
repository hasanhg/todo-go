#!/bin/sh

rm -rf ./todo/env-config.js
touch ./todo/env-config.js

echo "window.env = {" >> ./todo/env-config.js
echo "  REACT_APP_API_URL:'${API_URL}'" >> ./todo/env-config.js
echo "}" >> ./todo/env-config.js
