FROM node:19

WORKDIR /home/app

COPY ./main/package.json ./main/yarn.lock .env ./

RUN yarn install --force --frozen-lockfile

COPY ./main .

RUN rm -rf ./main

EXPOSE 7100
#CMD ["yarn", "start:docker"]