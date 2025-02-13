CREATE TABLE "UserPosts" (
	"Id" serial PRIMARY KEY NOT NULL,
	"User_Id" integer NOT NULL,
	"Caption" text,
	"Description" text,
	"Tags" varchar(300),
	"Is_Public" boolean DEFAULT false NOT NULL,
	"Created_At" timestamp DEFAULT now() NOT NULL
);
