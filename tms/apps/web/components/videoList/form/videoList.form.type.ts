import { IVideoListDto } from "@/common";
import { pickFormData, TFormComponentSchema, TFormViewSchema, zodArray, zodBooleanRequired, zodInfer, zodNumberRequired, zodObject, zodString, zodStringRequired } from "@/tmsui";

export type TVideoListFormComponentSchema = TFormComponentSchema<TVideoListSchema> & {
  editData?: Partial<IVideoListDto>;
}

export type TVideoListFormViewSchema = TFormViewSchema<TVideoListSchema> & {
  editData?: Partial<IVideoListDto>;
}

export const videoListSchema = zodObject({
  name: zodStringRequired(),
  description: zodStringRequired(),
  audienceTags: zodArray(zodStringRequired()).nonempty(),
  assignmentId: zodNumberRequired(),
  uploadType: zodString(),
  videoUrl: zodString(),
  fileResponse: zodObject({
    fileName: zodStringRequired(),
    playbackUrl: zodStringRequired(),
  }).optional(),
  fileName: zodString(),
  fileDirectory: zodString(),
  status: zodBooleanRequired(),
});


export type TVideoListSchema = zodInfer<typeof videoListSchema>;
export const videoListKeys = Object.keys(videoListSchema.shape) as (keyof zodInfer<typeof videoListSchema>)[];

const initialValues: TVideoListSchema = {
  name: "",
  description: "",
  audienceTags: [],
  assignmentId: "",
  uploadType: "file",
  videoUrl: "",
  fileName: "",
  fileResponse: {
    fileName: "",
    playbackUrl: "",
  },
  fileDirectory: "",
  status: true,
};

export const defaultValues = (isEdit?: boolean, editData?: Partial<IVideoListDto>): Partial<TVideoListSchema> => {
  return isEdit ? pickFormData(editData as unknown as TVideoListSchema, videoListKeys as (keyof TVideoListSchema)[]) : initialValues;
}

export const videoStatus = [
  { label: "アクティブ", value: "true" },
  { label: "非アクティブ", value: "false" },
];

// export const questionSet = [
//   { label: "問題セットを選択", value: "value" }, //Select a problem set
//   { label: "JavaScript Basics Quiz", value: "javascript-basics" },
//   { label: "React Fundamentals Test", value: "react-fundamentals" },
//   { label: "CSS Grid Assessment", value: "css-grid" },
//   { label: "Node.js Backend Quiz", value: "nodejs-backend" },
//   { label: "Database Design Test", value: "database-design" },
//   { label: "Leadership Assessment", value: "leadership-assessment" },
// ];
export const assignment = [
  { label: "Assignment 1: JavaScript Fundamentals", value: 1 },
  { label: "Assignment 2: React Components", value: 2 },
  { label: "Assignment 3: CSS Grid Layout", value: 3 },
  { label: "Assignment 4: Node.js API Development", value: 4 },
  { label: "Assignment 5: Database Design", value: 5 },
  { label: "Assignment 6: Leadership Skills", value: 6 },
  { label: "Assignment 7: Safety Protocols", value: 7 },
];
