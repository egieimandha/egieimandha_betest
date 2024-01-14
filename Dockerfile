# build stage
FROM node:alpine

COPY . ./app

WORKDIR /app

RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]