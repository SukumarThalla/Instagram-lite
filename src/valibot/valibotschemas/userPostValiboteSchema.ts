import * as v from "valibot";

export const userPostsValidations = v.object({
  userId: v.pipe(
    v.nonNullable(
      v.number("UserId is required and it must be a number"),
      "UserId cannot be null value or undefined"
    ),
    v.minValue(1, "UserId must be Greater then 0")
  ),
  caption: v.optional(
    v.pipe(
      v.string("Must be in string format"),
      v.trim(),
      v.maxLength(255, "Caption must not exceed 255 characters'")
    )
  ),
  description: v.optional(
    v.pipe(
      v.string("Must be in string format"),
      v.trim(),
      v.maxLength(300, "Description must not exceed 255 characters")
    )
  ),
  tags: v.optional(
    v.pipe(
      v.string("Must be in string format"),
      v.maxLength(300, "Tags must not exceed 255 characters")
    )
  ),
  isPublic: v.boolean("Option must be  either True of False"),
});

export const userIdValidation = v.pick(userPostsValidations, ["userId"])

export type userPostTypes = v.InferInput<typeof userPostsValidations>;
