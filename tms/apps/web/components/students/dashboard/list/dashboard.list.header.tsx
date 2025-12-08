import useStudentLang from "@/lang/students";

function DashboardListHeader() {
  const { dashboard } = useStudentLang();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {dashboard.header.title}
        </h1>
      </div>
    </div>
  );
}

export default DashboardListHeader;
