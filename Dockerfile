FROM ubuntu
MAINTAINER Craig Holzinger <clholzin@yahoo.com>

# install our dependencies and nodejs
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y install python-software-properties git build-essential
RUN add-apt-repository -y ppa:clholzin/clholzin-dassian_node_v1
RUN apt-get update
RUN apt-get -y install nodejs

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /src
ADD . /src

EXPOSE 3000

CMD ["node", "app.js"]
