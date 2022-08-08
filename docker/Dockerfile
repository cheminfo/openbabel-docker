FROM node:18

EXPOSE 20808

RUN apt-get update -y
RUN apt-get install -y openbabel

RUN mkdir /node
COPY src /node/src
COPY package.json /node/

WORKDIR /node
RUN npm i 

CMD npm start