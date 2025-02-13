import { Context } from "hono";
import { userPostQueries } from "../services/userPostQuery";

export class UserPostController {
  async postUser(c: Context) {
    try {
      const body = await c.req.json();
      await userPostQueries.postUserData(body);
      return c.json({ success: "POST ADDED SUCCESSFULLY" }, 201);
    } catch (error) {
      return c.json({ error: "Unable to Process now" }, 500);
    }
  }

  async getUserPosts(c: Context) {
    try {
      const UserId = c.req.param("userId");
      const userPosts = await userPostQueries.getUserPosts(UserId);
      return c.json({ success: "Success", userPosts }, 200);
    } catch (error) {
      return c.json({ error: "Unable to get the Posts" }, 500);
    }
  }
}

export const userPostController = new UserPostController();
