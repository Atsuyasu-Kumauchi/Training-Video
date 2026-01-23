import { Messages } from "@/common/constants";
import { z } from "zod";

const defaultMessage = Messages.FIELD_REQUIRED; // This field is required

export function zodUrlRequired(message: string = defaultMessage) {
  return z
    .string()
    .min(1, message)
    .url(Messages.INVALID_URL); // Invalid URL format
}
