"use strict";

const { createClient } = require("redis");

const redisClient = createClient();

redisClient
  .connect()
  .then(() => {
    console.log("Redis is connected");
  })
  .catch((err) => {
    console.log("Redis error.", err);
  });

setInterval(function () {
  console.log("Keeping alive - Node.js Performance Test with Redis");
  redisClient.set("ping", "ping");
}, 1000 * 60 * 4);

global.cache = redisClient;
module.exports = redisClient;
