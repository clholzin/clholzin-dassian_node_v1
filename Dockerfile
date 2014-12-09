FROM ubuntu:14.04
MAINTAINER Clholzin <clholzin@yahoo.com>
ADD . /src
WORKDIR /src
RUN npm install
RUN apt-get update
RUN apt-get install -y vim node gcc python nginx


EXPOSE 3001
ENTRYPOINT ["node"]
CMD ["app.js", "-p", "3001"]
