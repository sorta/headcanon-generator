# Some ideas taken from https://github.com/BretFisher/node-docker-good-defaults/

# Example usage:

# docker container run \
#   -d \
#   -e REACT_APP_DB_API_KEY=<your firebase API Key here> \
#   -e REACT_APP_DB_AUTH_DOMAIN=<your firebase Auth Domain here> \
#   -e REACT_APP_DB_URL=<your firebase URL here> \
#   -p 5000:5000 \
#   sorta/headcanon-generator

# docker container run --rm -it sorta/headcanon-generator -s

# docker container run \
#   -d \
#   --env-file ./.env.development.local \
#   -p 5000:5000 \
#   sorta/headcanon-generator

FROM node:8.11-alpine

RUN mkdir -p /opt/app

# Setup environment
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 5000
ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT

# App env values. There can be no sensible default values for the firebase db.
ARG REACT_APP_ALLOW_EDIT=false
ENV REACT_APP_ALLOW_EDIT $REACT_APP_ALLOW_EDIT

# global installs. Including latest npm, for speed and fixes
RUN npm i npm@latest -g
RUN npm i serve -g

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# Copy App files
WORKDIR /opt/app
COPY . .

# Final build & serve. This feels like a hack but seems to work. This build process should only
# be done once firebase env vars are set. And we don't want secret data in a public image.
# Secret data can be managed in compose / stacks, or possibly a private dockerfile/image
# based on this one.
ENTRYPOINT ["sh"]
CMD ["-c", "npm run build && serve -s build"]
