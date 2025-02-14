import { Hono } from "hono";
import { userPostController } from "../controllers/userPostControllers";
const userPostRoutes = new Hono();

userPostRoutes.post("/add-post", (c) => userPostController.postUser(c));

userPostRoutes.get("/userPosts/:userId?", (c) =>
  userPostController.getUserPosts(c)
);

export default userPostRoutes;
