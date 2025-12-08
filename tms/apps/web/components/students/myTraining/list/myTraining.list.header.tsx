import useStudentLang from "@/lang/students";

export default function MyTrainingListHeader() {
  const { myTraining } = useStudentLang();
  return (
    <>
      <h1 className="text-2xl font-bold mb-8"> {myTraining.header.title}</h1>
    </>
  );
}
