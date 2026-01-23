import { Messages } from "@/common/constants";
import { z } from "zod";

const defaultMessage = Messages.FIELD_REQUIRED; // This field is required

export function zodDateRequired(message: string = defaultMessage) {
  return z
    .string()
    .min(1, { message })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "0000-00-00形式で入力してください。", // Must be in ex: 0000-00-00 format
    });
}
