"use client";
import { USERS } from "@/common";
import { AuthServer, Button } from "@/tmsui";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const UserTrainingDetailsView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const type = searchParams.get("type");
  const { data: userData } = useQuery({
    queryKey: ["training-details", id],
    queryFn: async () => {
      const response = AuthServer({
        method: "GET",
        url: USERS.FIND_BY_ID(id),
      });
      return response;
    },
    enabled: !!id,
  });

  const { data: user } = userData || {};

  return (
    <>
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="pageTitle" className="text-2xl font-bold text-gray-900">
                {`${user?.firstName} ${user?.lastName} - Training Details`}
              </h2>
              <p id="pageSubtitle" className="text-gray-600 mt-1">
                {type
                  ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
                  : ""}{" "}
                training progress
              </p>
            </div>
            <Button
              type="button"
              color="neutral"
              onClick={() => router.push("/admin/users")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="fas fa-arrow-left w-5 h-5 mr-2"
              />
              ユーザー一覧に戻る
              {/* Back to User List */}
            </Button>
          </div>
          {/* User Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12">
                  <div
                    id="userAvatar"
                    className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center"
                  >
                    <span className="text-white font-medium text-lg">
                      {`${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <h3
                    id="userName"
                    className="text-lg font-medium text-gray-900"
                  >
                    {`${user?.firstName} ${user?.lastName}`}
                  </h3>
                  <p id="userEmail" className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                  <p id="userDepartment" className="text-sm text-gray-500">
                    IT Department
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Training List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Training Details
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                All trainings assigned to this user
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Training
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completed Date
                    </th>
                  </tr>
                </thead>
                <tbody
                  id="trainingsTable"
                  className="bg-white divide-y divide-gray-200"
                >
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-lg ${training.status === 'Complete' ? 'bg-green-600' : 'bg-blue-600'} flex items-center justify-center">
                            <i className="fas ${training.status === 'Complete' ? 'fa-check' : 'fa-book'} text-white text-xs"></i>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Introduction to HTML & CSS
                          </div>
                          <div className="text-sm text-gray-500">
                            Web Development
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user?.status === "Complete"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        Incomplete
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      2024-02-15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      -
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTrainingDetailsView;
