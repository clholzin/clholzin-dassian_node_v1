FROM node
MAINTAINER Clholzin <clholzin@yahoo.com>
ADD src /src/
WORKDIR /src
RUN npm install
RUN apt-get update
RUN apt-get install -y vim


EXPOSE 3001
ENTRYPOINT ["node"]
CMD ["app.js", "-p", "3001"]
