FROM node:20.14.0
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "-r", "dotenv/config", "./app.js" ]
