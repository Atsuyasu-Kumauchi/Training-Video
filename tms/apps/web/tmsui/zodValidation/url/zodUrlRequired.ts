import { z } from "zod";

const defaultMessage = "This field is required";

export function zodUrlRequired(message: string = defaultMessage) {
  return z
    .string()
    .min(1, message)
    .url("Invalid URL format (e.g. https://example.com)");
}
