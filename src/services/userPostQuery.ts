import { db } from "../db/dbConnection";
import { userPosts } from "../db/schema/userPostSchema";
import { eq, and, desc } from "drizzle-orm";
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
  async getUserPosts(userId: any, offset: number, limit: number) {
    return await db
      .select()
      .from(userPosts)
      .where(
        userId !== undefined
          ? and(eq(userPosts.userId, userId))
          : eq(userPosts.isPublic, true)
      )
      .orderBy(desc(userPosts.createdAt))
      .limit(limit)
      .offset(offset);
  }
}

export const userPostQueries = new UserPostQueries();
