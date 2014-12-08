FROM ubuntu:14.04
MAINTAINER Craig Holzinger
# Update packages and install dependencies.
RUN apt-get update && apt-get install -y install build-essential  \
gcc \
g++ \
python \
make \
curl \
nodejs

# install our dependencies and nodejs
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
#RUN apt-get update
RUN apt-get -y install python-software-properties git build-essential
RUN add-apt-repository -y ppa:clholzin/clholzin-dassian_node_v1
#RUN apt-get update
#RUN apt-get -y install nodejs

# Gets Node.js v0.10.29
# RUN mkdir -p /tmp/node && cd /tmp/node
# WORKDIR /tmp/node
# RUN curl -s0 http://nodejs.org/dist/v0.10.29/node-v0.10.29.tar.gz | tar -zx
# RUN cd node-v0.10.29
# WORKDIR /tmp/node/node-v0.10.29

# Install Node.js
RUN ./configure
RUN make
RUN make install
#RUN npm install

ADD src /src
WORKDIR /src

ADD package.json /package.json
RUN npm install
RUN mkdir -p /src && cp -a /node_modules /src/



ENV PORT 3001
EXPOSE 3001
##CMD ["app.js"]
##ENTRYPOINT ["node"]
CMD ["node", "app.js"]
