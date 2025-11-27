import { z } from "zod";

export function zodNumber() {
  return z
    .union([
      z.literal("").transform(() => null), // optional
      z.string().regex(/^\d*$/, "Must be empty or a non-negative integer"),
      z.number().int().nonnegative().transform(String),
    ])
    .nullable()
    .optional();
}
