import {
  integer,
  pgTable,
  serial,
  timestamp,
  text,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const userPosts = pgTable("UserPosts", {
  Id: serial("Id").primaryKey(),
  userId: integer("User_Id").notNull(),
  caption: text("Caption"),
  description: text("Description"),
  tags: varchar("Tags", { length: 300 }),
  isPublic: boolean("Is_Public").default(false).notNull(),
  createdAt: timestamp("Created_At").defaultNow().notNull(),
});
