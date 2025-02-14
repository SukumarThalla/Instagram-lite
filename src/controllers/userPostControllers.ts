import { Context } from "hono";
import { userPostQueries } from "../services/userPostQuery";
import { userPostTypes } from "../valibot/userPostValiboteSchema";
import { validationParse } from "../valibot/parseFunction";
import { handlingError } from "../exceptions/errorHandling";
export class UserPostController {
  async postUser(c: Context) {
    try {
      const body = await c.req.json();
      const ValidatedData: userPostTypes = await validationParse(body);
      await userPostQueries.postUserData(ValidatedData);
      return c.json({ success: "POST ADDED SUCCESSFULLY" }, 201);
    } catch (err) {
      return handlingError(err, c);
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
