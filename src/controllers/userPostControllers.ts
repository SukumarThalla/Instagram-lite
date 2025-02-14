import { Context } from "hono";
import { userPostQueries } from "../services/userPostQuery";
import { userPostTypes } from "../valibot/valibotschemas/userPostValiboteSchema";
import { validationParse } from "../valibot/parseFunction";
import { handlingError } from "../exceptions/errorHandling";
import {
  userPostsValidations,
  userIdValidation,
} from "../valibot/valibotschemas/userPostValiboteSchema";
import { array } from "valibot";
export class UserPostController {
  async postUser(c: Context) {
    try {
      const body = await c.req.json();
      const ValidatedData: userPostTypes = await validationParse(
        userPostsValidations,
        body
      );
      await userPostQueries.postUserData(ValidatedData);
      return c.json({ success: "POST ADDED SUCCESSFULLY" }, 201);
    } catch (err) {
      return handlingError(err, c);
    }
  }

  async getUserPosts(c: Context) {
    try {
      const userId = c.req.param("userId");
      const page = Number(c.req.query("page")) || 1;
      const limit = Number(c.req.query("limit")) || 10;
      const offset = (page - 1) * limit;

      const userPosts = await userPostQueries.getUserPosts(
        userId,
        offset,
        limit
      );
      return c.json(
        {
          success: userPosts.length
            ? "Success"
            : "No posts Found on this UserId",
          noOfPosts: userPosts.length,
          posts: userPosts,
        },
        200
      );
    } catch (error) {
      return c.json({ error: "Unable to get the Posts" }, 500);
    }
  }
}

export const userPostController = new UserPostController();
