import { Hono } from "hono";
import userPostRoutes from "../src/routes/userPostRoutes";
import { serve } from "@hono/node-server";
import "./db/dbConnection";
const app = new Hono();

app.get("/", (c) => {
  return c.json({ success: "success" }, 200);
});

app.route("/", userPostRoutes);
serve({
  fetch: app.fetch,
  port: 5000,
});

console.log("http://localhost:5000");
