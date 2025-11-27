import { z } from "zod";

export function zodBoolean() {
  return z
    .union([z.boolean(), z.string(), z.number(), z.null()])
    .transform((val) => {
      if (val === null || val === "") return null;
      if (typeof val === "boolean") return val;
      if (typeof val === "string") return val.toLowerCase() === "true";
      if (typeof val === "number") return val !== 0;
      return false;
    });
}
