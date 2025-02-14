import { BaseExceptions } from "../exceptions/baseExceptions";
import * as v from "valibot";

export async function validationParse(schema: any, body: any) {
  const validations = v.safeParse(schema, body, {
    abortPipeEarly: true,
  });

  if (!validations.success) {
    const errors = v.flatten(validations.issues).nested;
    console.log(errors);
    throw new BaseExceptions("Validation failed", 400, errors);
  }
  return validations.output;
}
