import { db } from "../db/dbConnection";
import { userPosts } from "../db/schema/userPostSchema";
import { eq } from "drizzle-orm";
class UserPostQueries {
  async postUserData(body: any) {
    return await db.insert(userPosts).values({
      userId: body.userId,
      caption: body.caption,
      description: body.description,
      tags: body.tags,
      isPublic: body.isPublic,
    });
  }
  async getUserPosts(userId?: any) {
    const query = db.select().from(userPosts).orderBy(userPosts.createdAt);
    return userId !== undefined
      ? await query.where(eq(userPosts.userId, userId))
      : await query;
  }
}

export const userPostQueries = new UserPostQueries();
