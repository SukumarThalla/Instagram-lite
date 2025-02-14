import { BaseExceptions } from "../exceptions/baseExceptions";
import * as v from "valibot";
import { userPostsValidations } from "./userPostValiboteSchema";

export async function validationParse(body: any) {
  const validations = v.safeParse(userPostsValidations, body, {
    abortPipeEarly: true,
  });

  if (!validations.success) {
    const errors = v.flatten(validations.issues).nested;
    throw new BaseExceptions("Validation failed", 400, errors);
  }
  return validations.output;
}
