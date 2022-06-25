# Install dependencies only when needed
FROM node:16-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn


WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./

RUN yarn install --frozen-lockfile

COPY .next .next
COPY public public

CMD yarn start


# RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

# WORKDIR /home/node/app

# COPY package.json package.json
# COPY package-lock.json package-lock.json

# USER node

# RUN npm install --production

# COPY --chown=node:node .next .next
# COPY --chown=node:node public public

# EXPOSE 3000

# CMD npm start