FROM node:14 AS PROD

WORKDIR /backend
COPY package.json .
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
COPY . .
CMD npm run dev
