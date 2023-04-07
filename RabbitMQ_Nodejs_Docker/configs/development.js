import dotenv from "dotenv";
dotenv.config();
const { env } = process;
export default {
  name: env.APP_NAME,
  baseUrl: env.APP_BASE_URL,
  port: env.PORT,
  RMQUrl: env.RMQ_URL,
};
