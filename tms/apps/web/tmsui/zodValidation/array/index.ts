import { z } from "zod";

export function zodArray<T extends z.ZodTypeAny>(
  schema: T,
  min?: number,
  message = "This field is required",
) {
  let arr = z.array(schema);
  if (min !== undefined) {
    arr = arr.min(min, message);
  }
  return arr;
}
