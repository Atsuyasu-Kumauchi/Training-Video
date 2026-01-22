import { z } from "zod";

export function zodArray<T extends z.ZodTypeAny>(schema: T) {
  return z.array(schema);
}
