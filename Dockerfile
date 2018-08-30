FROM mhart/alpine-node

COPY build/ /www/
COPY build-server/ /server/
COPY node_modules/ /node_modules/
# add volume

ENTRYPOINT [ "node", "/server/main.js"]
EXPOSE 3001