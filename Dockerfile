FROM node:alpine

RUN apk add --no-cache wireguard-tools iptables resolvconf nodejs npm

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]
