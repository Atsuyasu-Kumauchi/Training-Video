import { z } from "zod";

export function zodPasswordRequired(
  passwordRule: (schema: typeof z) => z.ZodTypeAny = (z) =>
    z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
  // .regex(/[A-Z]/, "パスワードは大文字を含む必要があります")
  // .regex(/[a-z]/, "パスワードは小文字を含む必要があります")
  // .regex(/[0-9]/, "パスワードは数字を含む必要があります")
  // .regex(
  //   /[^A-Za-z0-9]/,
  //   "パスワードには少なくとも1つの特殊文字を含める必要があります"
  // )
) {
  return passwordRule(z);
}
