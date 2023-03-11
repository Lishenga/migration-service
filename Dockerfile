# FROM node:12.15.0-alpine
FROM node:16-alpine3.14

# Create app directory
WORKDIR /usr/src/app

# Copy package files
# COPY package*.json ./
COPY . .
# RUN rm -rf dist

RUN npm i --f
# RUN npm run build
# RUN npm i next
# RUN npm install --force
# RUN npm run build

EXPOSE 3333
# CMD [ "npm", "run", "start:prod" ]
CMD [ "node", "dist/main" ] 
