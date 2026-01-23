import { useLang } from "@/lang";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function TrainingListFilter() {
  const { testCreation, user } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("statusFilter") ?? "";

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  const { register, handleSubmit, reset } = useForm({ mode: "all", defaultValues: { nameFilter: "" } })
  const onSearchFilterChange: SubmitHandler<{ nameFilter: string }> = (value) => {
    updateQuery("nameFilter", value.nameFilter);
  }

  const onClearFilterChange = () => {
    reset()  // input clear
    router.push("?");    // all query param delete
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {testCreation.filter.status}
            </label>
            <select
              value={status}
              onChange={(e) => updateQuery("statusFilter", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">すべてのステータス</option>
              <option value="true">アクティブ</option>
              <option value="false">非アクティブ</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {testCreation.filter.search}
            </label>
            <form onSubmit={handleSubmit(onSearchFilterChange)} className="flex gap-2">
              <input
                type="text"
                id="searchInput"
                placeholder={testCreation.filter.searchPlaceholder}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                {...register("nameFilter")}
              />
              <button
                id="searchButton"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                type="submit"
              >
                {testCreation.filter.search}
              </button>
              <button
                onClick={() => onClearFilterChange()}
                id="searchButton"
                type="button"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                {user.filter.clearFilters}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
