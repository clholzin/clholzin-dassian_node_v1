FROM ubuntu
MAINTAINER Craig Holzinger <clholzin@yahoo.com>

# install our dependencies and nodejs
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
# RUN apt-get update
# RUN apt-get -y install python-software-properties git build-essential
# RUN apt-get -y install git build-essential
# RUN add-apt-repository -y ppa:clholzin/clholzin-dassian_node_v1
RUN apt-get update
RUN apt-get -y install nodejs



#ADD package.json /src/package.json
#RUN cd /src && npm install
ADD . /src/package.json
RUN npm install
RUN mkdir -p /src && cp -a /node_modules /src/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
ADD src /src
WORKDIR /src

ENV    PORT 3001
EXPOSE 3001

CMD ["node", "app.js"]
