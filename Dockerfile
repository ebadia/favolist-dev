FROM node:carbon

# create app dir
WORKDIR /microservice

# install depencencies
COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "start"]