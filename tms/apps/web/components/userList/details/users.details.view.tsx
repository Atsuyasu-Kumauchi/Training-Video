import { Badge } from "@/common";
import { LangUser } from "@/lang/user";
import { Button } from "@/tmsui";
import { faBookOpen, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { TUserFormComponentSchema } from "../form/user.form.type";

export default function UsersDetailsView({
  modalRef,
  editData,
}: TUserFormComponentSchema) {
  const { view } = LangUser;
  console.log("user editData", editData);

  return (
    <>
      <div id="modalContent" className="text-sm text-gray-500">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {view.email}
                </label>
                <p className="text-sm text-gray-900">
                  {editData?.email ? editData?.email : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {view.department}
                </label>
                <p className="text-sm text-gray-900">
                  {editData?.department?.name
                    ? editData?.department?.name
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {view.role}
                </label>
                <p className="text-sm text-gray-900">
                  {editData?.role?.name ? editData?.role?.name : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {view.status}
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Badge status={editData?.status ? "Active" : "Inactive"} />
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {view.employeeID}
                </label>
                <p className="text-sm text-gray-900">
                  {editData?.employeeId ? editData?.employeeId : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {view.startDate}
                </label>
                <p className="text-sm text-gray-900">
                  {editData?.joinDate ? editData?.joinDate : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {view.tag}
                </label>
                <p className="text-sm text-gray-900">
                  {Array.isArray(editData?.tags) && editData.tags.length > 0
                    ? editData.tags
                        .map((item) => item.name.toUpperCase())
                        .join(", ")
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {view.adminisPrivileges}
                </label>
                <p className="text-sm text-gray-900">N/A</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              {view.tProgress}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors duration-200">
                <Link
                  href={`/admin/users/user-training-details/${editData?.userId}?type=assigned`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        {view.assignTraining}
                      </p>
                      <p className="text-2xl font-bold text-blue-600">8</p>
                    </div>
                    <div className="text-blue-600">
                      <FontAwesomeIcon icon={faBookOpen} className="text-xl" />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="bg-green-50 rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-colors duration-200">
                <Link
                  href={`/admin/users/user-training-details/${editData?.userId}?type=completed`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        {view.completeTraining}
                      </p>
                      <p className="text-2xl font-bold text-green-600">6</p>
                    </div>
                    <div className="text-green-600">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-xl"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
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
