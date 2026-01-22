import { Messages } from "@/common/constants";
import { z } from "zod";

export function zodArrayRequired<T extends z.ZodTypeAny>(schema: T) {
  return z.array(schema).min(1, Messages.FIELD_REQUIRED); // This field is required
}
