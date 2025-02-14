import * as v from "valibot";

export const userPostsValidations = v.object({
  userId: v.pipe(
    v.nonNullable(v.number(), "UserId cannot be null value"),
    v.minValue(1, "UserId must be Greater then 0")
  ),
  caption: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.maxLength(255, "Caption must not exceed 255 characters'")
    )
  ),
  description: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.maxLength(300, "Description must not exceed 255 characters")
    )
  ),
  tags: v.optional(
    v.pipe(v.string(), v.maxLength(300, "Tags must not exceed 255 characters"))
    ),
  
});
