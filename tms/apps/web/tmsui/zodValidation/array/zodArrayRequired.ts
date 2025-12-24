import { z } from "zod";

export function zodArrayRequired<T extends z.ZodTypeAny>(schema: T) {
  return z.array(schema).min(1, "This field is required");
}
