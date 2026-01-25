import { Badge } from "@/common";
import { Button } from "@/tmsui";
import { useState } from "react";
import { TCreateTestFormViewSchema } from "../form/createTest.form.type";

export default function CreateTestDetailsView({
  modalRef,
  editData,
}: TCreateTestFormViewSchema) {
  const [participant, setParticipant] = useState(null);

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Questions
              </label>
              <p className="text-sm text-gray-900">
                {editData?.testQuestions?.length}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <span className="inline-flex items-center  py-0.5 rounded-full text-xs font-medium ${test.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                <Badge status={editData?.status ? "Active" : "Inactive"} />
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Created Date
              </label>
              <p className="text-sm text-gray-900">
                {editData?.created?.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <p className="text-sm text-gray-900">
              {editData?.description ? editData?.description : "N/A"}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-lg font-medium text-gray-900 mb-3">
            Participant Results
          </h4>
          <div className="overflow-x-auto">

            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {participant ?
                  (<tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              JD
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            John Doe
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      John@gmail.com
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      2024-01-20
                    </td>
                  </tr>
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-3 text-sm text-gray-500 text-center"
                      >
                        No participants found
                      </td>
                    </tr>
                  )}
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
          Close
        </Button>
      </div>
    </>
  );
}
