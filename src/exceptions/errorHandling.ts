import { BaseExceptions } from "../exceptions/baseExceptions";
import { Context } from "hono";
export async function handlingError(err: any, c: Context) {
  if (err instanceof BaseExceptions) {
    return c.json(
      {
        message: err.message,
        status: err.statusCode,
        error: err.errors,
      },
      400
    );
  }
  return c.json({ error: "failed in the exception handling" });
}
