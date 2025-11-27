import { z } from "zod";

const defaultMessage = "This field is required";

export function zodNumberRequired(message: string = defaultMessage) {
  return z
    .union([z.string(), z.number(), z.null()])
    .transform((val) => {
      if (val === null || val === "") return null;

      const num = typeof val === "number" ? val : Number(val);
      return isNaN(num) ? val : num;
    })
    .refine((val) => val !== null && typeof val === "number" && !isNaN(val), {
      message,
    })
    .refine((val) => typeof val === "number" && val >= 0, {
      message: "Only non-negative numbers allowed",
    });
}
