import { SHARED_COUNTER_UPDATE_LIST } from "./configs/development.js"
import { RedisClient } from "./redisClient.js"
import RMQConnect from "./RMQ/connect.js"
import QueueFunctions from "./RMQ/queueFunctions.js"

async function start() {
  try {
    const RMQChannel = await new RMQConnect().Initialize()
    const queueFunctions = new QueueFunctions(RMQChannel)
    const processQueue = await queueFunctions.getExclusiveQueue()
    await queueFunctions.consumeFromFanoutExchange(processQueue)
    await pushIncrementCommand(RedisClient, 2, 2)
  } finally {
    await RedisClient.disconnect()
  }
}

async function pushIncrementCommand(RedisClient, processId, incrementValue) {
  try {
    await RedisClient.rpush(
      SHARED_COUNTER_UPDATE_LIST,
      JSON.stringify({ process_id: processId, increment_value: incrementValue })
    )
    console.log(
      `Increment command pushed to Redis queue by process ${processId}`
    )
  } catch (error) {
    console.error("Error pushing increment command to Redis queue:", error)
  }
}

start()
