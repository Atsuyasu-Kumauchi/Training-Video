import { zodInfer, zodObject, zodStringRequired } from "@/tmsui";

export const videoListSchema = zodObject({
    name: zodStringRequired(),
});

export type TVideoListSchema = zodInfer<typeof videoListSchema>;

export const initialValues: TVideoListSchema = {
    name: "",
};