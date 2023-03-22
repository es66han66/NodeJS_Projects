require('dotenv').config()
const { env } = process
module.exports = {
  name: env.APP_NAME,
  baseUrl: env.APP_BASE_URL,
  port: env.PORT,
  redis_url: env.REDIS_URL,
  redis_host: env.REDIS_HOST,
  redis_port: env.REDIS_PORT,
  redis_password: env.REDIS_PASSWORD
}
