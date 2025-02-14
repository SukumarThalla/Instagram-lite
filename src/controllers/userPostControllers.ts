import { Context } from "hono";
import { userPostQueries } from "../services/userPostQuery";
import {
  userPostsValidations,
  userPostTypes,
} from "../valibot/userPostValibote";
import * as v from "valibot";
export class UserPostController {
  async postUser(c: Context) {
    try {
      const body = await c.req.json();
      const validations = v.safeParse(userPostsValidations, body, {
        abortPipeEarly: true,
      });

      if (!validations.success) {
        const errors = v.flatten(validations.issues).nested;
        return c.json({ errors: errors }, 400);
      }
      const ValidatedData: userPostTypes = validations.output;
      await userPostQueries.postUserData(ValidatedData);
      return c.json({ success: "POST ADDED SUCCESSFULLY" }, 201);
    } catch (error) {
      console.log(error);
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
