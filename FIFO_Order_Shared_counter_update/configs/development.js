import dotenv from "dotenv"
dotenv.config()
const { env } = process

export const COUNTER_KEY = env.COUNTER_KEY
export const LOCK_KEY = env.LOCK_KEY
export const LOCK_EXPIRY = env.LOCK_EXPIRY
export const SHARED_COUNTER_UPDATE_LIST = env.SHARED_COUNTER_UPDATE_LIST
export const RMQUrl = env.RMQ_URL
export const FANOUT_EXCHANGE = env.FANOUT_EXCHANGE