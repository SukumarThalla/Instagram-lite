import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      ca: fs.readFileSync("./ca.pem".toString()),
      rejectUnauthorized: true,
    },
  },
};
