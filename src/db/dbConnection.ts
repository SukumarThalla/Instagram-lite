import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
import pg from "pg";
import { userPosts } from "../db/schema/userPostSchema";
import fs from "fs";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.PORT),
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync("./ca.pem".toString()),
    rejectUnauthorized: true,
  },
});

export const db = drizzle(pool, { schema: { userPosts } });

db.execute("SELECT 1")
  .then(() => console.log("DB CONNECTION IS SUCCESSFULL"))
  .catch(() => console.error("Failed"));
