import { Messages } from "@/common/constants";
import { z } from "zod";

const defaultMessage = Messages.FIELD_REQUIRED; // This field is required

export function zodBooleanRequired(message: string = defaultMessage) {
  return z.coerce.boolean().refine((val) => val === true, {
    message: message,
  });
}
