FROM node:19-alpine3.16 AS deps
RUN apk add protobuf-dev
WORKDIR /apps/common
COPY ./apps/common .
RUN npm install
RUN npm run build
WORKDIR /apps/node-client
COPY ./apps/node-client .
RUN npm install
CMD ["npm", "run", "dev"]