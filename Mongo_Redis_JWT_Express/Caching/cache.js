import Redis from "ioredis";
const redisClient = new Redis();

export async function getRedisClient() {
    return new Promise((resolve, reject) => {
        redisClient
        .on("ready", async () => {
          console.log("Redis is connected");
          resolve(redisClient)
        })
        .on("error", (err) => {
          console.log("Redis error.", err);
        });
    })
}



