FROM mhart/alpine-node

COPY build/ /front/
COPY build-server/ /server/
COPY node_modules/ /node_modules/
VOLUME [ "/front", "/front" ]

EXPOSE 3001
ENTRYPOINT [ "node", "/server/main.js"]