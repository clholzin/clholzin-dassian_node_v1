FROM ubuntu:14.04
MAINTAINER Craig Holzinger
# Update packages and install dependencies.
RUN apt-get update && apt-get install -y \
gcc \
g++ \
python \
make \
curl
# Gets Node.js v0.10.29
RUN mkdir -p /tmp/node && cd /tmp/node
WORKDIR /tmp/node
RUN curl -s0 http://nodejs.org/dist/v0.10.29/node-v0.10.29.tar.gz | tar -zx
RUN cd node-v0.10.29
WORKDIR /tmp/node/node-v0.10.29
# Install Node.js
RUN ./configure
RUN make
RUN make install
RUN npm install
ADD src /src
WORKDIR /src
ENV PORT 3001
EXPOSE 3001
CMD ["app.js"]
ENTRYPOINT ["node"]
