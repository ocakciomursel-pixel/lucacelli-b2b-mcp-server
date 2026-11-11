FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY bin ./bin
ENTRYPOINT ["node", "./bin/mcp-server.mjs"]
