import { Hono } from "hono";
import { userPostController } from "../controllers/userPostControllers";
const userPostRoutes = new Hono();

userPostRoutes.post("/user-new-post", (c) => userPostController.postUser(c));

userPostRoutes.get("/getUserPosts/:userId?", (c) =>
  userPostController.getUserPosts(c)
);

export default userPostRoutes;
