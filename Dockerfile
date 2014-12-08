FROM ubuntu
MAINTAINER Craig Holzinger <clholzin@yahoo.com>

# install our dependencies and nodejs
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list

RUN apt-get update
RUN apt-get -y install nodejs

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
ADD src /src
WORKDIR /src


# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
#ADD package.json /src/package.json
RUN cd /src npm install
RUN mkdir -p /src && cp -a /src/node_modules /src/



ENV    PORT 3001
EXPOSE 3001

CMD ["node", "app.js"]
