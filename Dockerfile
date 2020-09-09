# build environment
FROM node:alpine as build
RUN apk add --no-cache git

WORKDIR /app
COPY . /app/
COPY package*.json /app/
RUN npm install

RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx.html
RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
