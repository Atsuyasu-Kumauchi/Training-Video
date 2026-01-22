import useStudentLang from "@/lang/students";

export default function ResultsListHeader() {
  const { result } = useStudentLang();
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">
        {result.header.title}
      </h1>
      <p className="text-gray-600 mt-1"> {result.header.sub_title}</p>
    </div>
  );
}
