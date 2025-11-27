import { z } from "zod";
import { sanitizeSQLInput } from "./zodString";

const defaultMessage = "This field is required";

export function zodStringRequired(message: string = defaultMessage) {
  return z.coerce
    .string()
    .min(1, { message })
    .transform(sanitizeSQLInput);
}
