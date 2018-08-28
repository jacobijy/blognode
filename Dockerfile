FROM node
FROM mongo
FROM redis
ENV NODE_ENV devlopment
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --devlopment --silent && mv node_modules ../
COPY ./dist .
EXPOSE 3000
CMD npm start