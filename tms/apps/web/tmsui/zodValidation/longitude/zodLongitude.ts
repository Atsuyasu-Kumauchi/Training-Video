import { z } from "zod";

export function zodLongitude() {
  z.union([
    z.number(),
    z
      .string()
      .regex(
        /^[-+]?(180(\.0+)?|[0-9]{1,2}(\.[0-9]+)?)$/,
        "Invalid longitude format",
      )
      .transform(Number),
  ])
    .transform(Number) // Ensure it's a number
    .pipe(
      z
        .number()
        .min(-180, { message: "Longitude must be ≥ -180" })
        .max(180, { message: "Longitude must be ≤ 180" })
        .refine((val) => !isNaN(val), {
          message: "Longitude must be a valid number",
        }),
    );
}