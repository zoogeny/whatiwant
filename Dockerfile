FROM node:12.13 AS build

WORKDIR /home/node

COPY . .

RUN npm install
RUN npm run build:dev
RUN npm run build:react
RUN npm run init

# ---------- end build image / prod image start ----------

FROM node:12.13-alpine

USER node
WORKDIR /home/node

COPY --from=build --chown=node /home/node/package*.json ./
COPY --from=build --chown=node /home/node/build ./build
COPY --from=build --chown=node /home/node/server/dist ./server
COPY --from=build --chown=node /home/node/server/data/wants.sqlite3 ./server/data/wants.sqlite3

ENV NODE_ENV=production
RUN npm install --prod

EXPOSE 4000
CMD ["node", "server/index.js"]
