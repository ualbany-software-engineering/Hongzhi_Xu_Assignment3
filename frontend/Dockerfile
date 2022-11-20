FROM node AS BUILD

WORKDIR /frontend

COPY . .
RUN yarn install
RUN yarn build

FROM nginx AS PROD

COPY  --from=BUILD  /frontend/build  /usr/share/nginx/html

RUN mkdir /etc/nginx/templates
ADD templates /etc/nginx/templates