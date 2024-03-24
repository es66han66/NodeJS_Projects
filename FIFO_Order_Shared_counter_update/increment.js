import {
  COUNTER_KEY,
  LOCK_KEY,
  LOCK_EXPIRY,
  SHARED_COUNTER_UPDATE_LIST,
} from "./configs/development.js"
import { RedisClient } from "./redisClient.js"
import RMQConnect from "./RMQ/connect.js"
import QueueFunctions from "./RMQ/queueFunctions.js"
let queueFunctions

async function processUpdates(queue) {
  try {
    console.log("Waiting for message in list")
    const [_key, value] = await RedisClient.blpop(queue, 0)
    const msg = JSON.parse(value)
    console.log(
      `Consumer 1: Processing update from queue ${queue}: for process: `,
      msg.process_id
    )
    await incrementSharedCounterBy(msg, 5)
  } catch (err) {
    console.error(`Error processing update from queue ${queue}:`, err)
  }
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function incrementSharedCounterBy(msg, maxRetries) {
  let retries = 0

  while (retries < maxRetries) {
    try {
      const lockAcquired = await RedisClient.set(
        LOCK_KEY,
        msg.process_id,
        "EX",
        LOCK_EXPIRY,
        "NX"
      )

      if (!lockAcquired) {
        console.log(
          "Failed to acquire lock. Another process is modifying the counter."
        )
        retries++
        await delay(1000 * retries)
        continue // Retry with delay
      }

      const currentCounterValue = await RedisClient.get(COUNTER_KEY)
      const incrementedCounterValue =
        Number(currentCounterValue) + msg.increment_value
      await RedisClient.set(COUNTER_KEY, incrementedCounterValue)
      await RedisClient.del(LOCK_KEY)
      console.log(
        `Shared counter incremented by ${msg.increment_value}. New value: ${incrementedCounterValue}`
      )
      await sendToFanoutExchange(JSON.stringify({"status":"success","process_id":msg.process_id,"incrementBy":msg.increment_value,"incrementedValue":incrementedCounterValue}))
      return
    } catch (err) {
      console.error("Error incrementing shared counter:", err)
      retries++
      await delay(1000 * retries)
    }
  }
  await sendToFanoutExchange(JSON.stringify({"status":"failed","process_id":msg.process_id,"incrementBy":msg.increment_value,"incrementedValue":-1}))
  console.error("Max retries reached. Failed to increment shared counter.")
}

async function sendToFanoutExchange(message) {
  try {
    await queueFunctions.sendToFanoutExchange(message)
  } catch (error) {
    console.error("Error in publishing to RMQ", error)
  }
}

async function start() {
  const RMQClient = await new RMQConnect().Initialize()
  queueFunctions = new QueueFunctions(RMQClient)
  while (true) {
    await processUpdates(SHARED_COUNTER_UPDATE_LIST)
  }
}

start()
