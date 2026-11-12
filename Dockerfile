FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY bin ./bin
COPY server.json glama.json smithery.yaml README.md LICENSE ./

EXPOSE 8080

ENTRYPOINT ["node", "./bin/mcp-server.mjs"]
