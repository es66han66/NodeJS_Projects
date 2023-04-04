import dotenv from "dotenv";
dotenv.config();
const { env } = process;
export default {
  name: env.APP_NAME,
  baseUrl: env.APP_BASE_URL,
  port: env.PORT,
  mongoURL: env.MONGO_URL,
  secretKey: env.SECRET_KEY
};
