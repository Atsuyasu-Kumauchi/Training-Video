import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const createTestSchema = zodObject({
  name: zodStringRequired(),
  category: zodStringRequired(),
  status: zodStringRequired(),
});

export type TCreateTestSchema = zodInfer<typeof createTestSchema>;

export const initialValues: TCreateTestSchema = {
  name: "",
  category: "",
  status: "",
};
