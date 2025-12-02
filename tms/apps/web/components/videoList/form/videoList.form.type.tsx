import { zodInfer, zodObject, zodString, zodStringRequired } from "@/tmsui";

export const videoListSchema = zodObject({
  title: zodStringRequired(),
  explanation: zodStringRequired(),
  category: zodStringRequired(),
  status: zodString(),
  problemSetOne: zodStringRequired(),
  problemSetTwo: zodStringRequired(),
  problemSetThree: zodStringRequired(),
  problemSetFour: zodStringRequired(),
  assignment: zodStringRequired(),
  uploadType: zodString(),
  youtubeUrl: zodString(),
});

export type TVideoListSchema = zodInfer<typeof videoListSchema>;

export const initialValues: TVideoListSchema = {
  title: "",
  explanation: "",
  status: "",
  category: "",
  problemSetOne: "",
  problemSetTwo: "",
  problemSetThree: "",
  problemSetFour: "",
  assignment: "",
  uploadType: "file",
  youtubeUrl: "",
};
export const status = [
  { label: "下書き", value: "Draft" }, //draft
  { label: "公開済み", value: "Published" }, //Published
  { label: "アーカイブ済み", value: "Archived" }, //Archived
];
export const category = [
  { label: "カテゴリを選択", value: "value" }, //Select a category
  { label: "トレーニング", value: "training" }, //training
  { label: "チュートリアル", value: "tutorial" }, //tutorial
  { label: "プレゼンテーション", value: "presentation" }, //presentation
  { label: "デモ", value: "demo" }, //demo
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
