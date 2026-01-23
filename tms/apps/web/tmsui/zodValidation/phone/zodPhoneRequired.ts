import { Messages } from "@/common/constants";
import { z } from "zod";

const defaultMessage = Messages.FIELD_REQUIRED; // This field is required

export function zodPhoneRequired(message: string = defaultMessage) {
  return z
    .string()
    .min(1, message)
    .regex(
      /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "電話番号は+8801または01で始まり、11桁である必要があります（例: +8801XXXXXXXXX または 01XXXXXXXXX）。" // Phone must start with +8801 or 01 and be 11 digits
    );
}
