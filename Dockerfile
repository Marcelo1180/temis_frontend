# stage1 - build react app first 
FROM node:14.19.3-alpine3.15 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app

COPY ./src/constants/index.js.example /app/src/constants/index.js

RUN npm install

RUN npm run build

CMD ["npm", "start"]

# stage 2 - build the final image and copy the react build files
FROM nginx:1.21.6-alpine

ARG version

LABEL maintainer="Marcelo Arteaga <marcelo.arteaga@klead.tech>"
LABEL version="${version}"

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
