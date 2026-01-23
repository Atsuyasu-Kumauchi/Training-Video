import { Badge } from "@/common";
import { LangUser } from "@/lang/user";
import { Button } from "@/tmsui";
import { TTrainingFormComponentSchema } from "../form/training.form.type";

export default function TrainingDetailsView({
  modalRef,
  editData,
}: TTrainingFormComponentSchema) {
  const { view } = LangUser;
  console.log("editData", editData);

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <p className="text-sm text-gray-900">
                {editData?.description ? `${editData?.description}` : "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <p className="text-sm text-gray-900">N/A</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructor
              </label>
              <p className="text-sm text-gray-900">N/A</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${training.status === 'Active' ? 'bg-green-100 text-green-800' : training.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                <Badge
                  status={editData?.status == true ? "Active" : "Inactive"}
                />
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <p className="text-sm text-gray-900">N/A</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Created Date
              </label>
              <p className="text-sm text-gray-900">
                {editData?.created
                  ? `${editData?.created?.split("T")[0]}`
                  : "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Videos
              </label>
              <p className="text-sm text-gray-900">N/A</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Video List</h4>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Video Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Introduction to JavaScript
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    15:30
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    Programming
                  </td>
                </tr>
                {/* <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 text-sm text-gray-500 text-center"
                  >
                    No videos available
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
        <Button
          onClick={() => modalRef?.current?.modalClose()}
          variant="solid"
          color="neutral"
        >
          {view.close}
        </Button>
      </div>
    </>
  );
}
