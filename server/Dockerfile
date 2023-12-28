FROM node:18.18.0
RUN mkdir -p /usr
WORKDIR /usr
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6060
CMD ["npm", "start"]



