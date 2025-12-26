import { IVideoListDto } from "@/common";
import { pickFormData, TFormComponentSchema, TFormViewSchema, zodArray, zodBoolean, zodInfer, zodObject, zodString, zodStringRequired } from "@/tmsui";

export type TVideoListFormComponentSchema = TFormComponentSchema<TVideoListSchema> & {
  editData?: Partial<IVideoListDto>;
}

export type TVideoListFormViewSchema = TFormViewSchema<TVideoListSchema>

export const videoListSchema = zodObject({
  name: zodStringRequired(),
  description: zodStringRequired(),
  audienceTags: zodArray(zodString()),
  assignmentId: zodStringRequired(),
  uploadType: zodString(),
  videoUrl: zodString(),
  fileName: zodString(),
  fileDirectory: zodString(),
  status: zodBoolean(),
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
  fileDirectory: "",
  status: false,
};

export const defaultValues = (isEdit?: boolean, editData?: Partial<IVideoListDto>): Partial<TVideoListSchema> => {
  return isEdit ? pickFormData(editData as unknown as TVideoListSchema, videoListKeys as (keyof TVideoListSchema)[]) : initialValues;
}



export const videoStatus = [
  { label: "公開済み", value: "Published" }, //Published
  { label: "アーカイブ済み", value: "Archived" }, //Archived
];


export const questionSet = [
  { label: "問題セットを選択", value: "value" }, //Select a problem set
  { label: "JavaScript Basics Quiz", value: "javascript-basics" },
  { label: "React Fundamentals Test", value: "react-fundamentals" },
  { label: "CSS Grid Assessment", value: "css-grid" },
  { label: "Node.js Backend Quiz", value: "nodejs-backend" },
  { label: "Database Design Test", value: "database-design" },
  { label: "Leadership Assessment", value: "leadership-assessment" },
];
export const assignment = [
  { label: "課題を選択", value: "assignment-1" }, //Select an issue
  { label: "Assignment 1: JavaScript Fundamentals", value: "assignment-1" },
  { label: "Assignment 2: React Components", value: "assignment-2" },
  { label: "Assignment 3: CSS Grid Layout", value: "assignment-3" },
  { label: "Assignment 4: Node.js API Development", value: "assignment-4" },
  { label: "Assignment 5: Database Design", value: "assignment-5" },
  { label: "Assignment 6: Leadership Skills", value: "assignment-6" },
  { label: "Assignment 7: Safety Protocols", value: "assignment-7" },
];
