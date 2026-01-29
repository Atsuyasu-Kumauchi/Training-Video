import { Metadata } from "next";
import dynamic from "next/dynamic";

const MyTrainingController = dynamic(
  () => import("@/components/students/myTraining/myTraining.controller"),
);
export const metadata: Metadata = {
  title: "マイトレーニング - トレーニングプラットフォーム", // My Training - Training Platform
};

export default function MyTrainingsPage() {
  return <MyTrainingController />;
}
