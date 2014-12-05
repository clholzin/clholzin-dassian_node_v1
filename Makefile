install:
npm install
build:
docker build -t clholzin/clholzin-dassian_node_v1 .
run:
node app.js
run-container:
docker run -p 49160:3001 -d clholzin/clholzin-dassian_node_v1
test:
curl localhost
clean:
rm -rf node_modules
.PHONY: install build run test clean
