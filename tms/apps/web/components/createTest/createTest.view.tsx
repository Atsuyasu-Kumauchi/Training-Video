import { Button, cn } from "@/tmsui";
import { TUiBasicModalRef, TUiBasicModalRefType, UiBasicModal, uiBasicModalRefDefaultValue } from "@/tmsui/ui/UIBasicModal";
import { faClipboardCheck, faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const TESTS_DATA = [
  {
    name: "JavaScript Basics Quiz",
    description: "Test fundamental JavaScript concepts",
    category: "Programming",
    iconBg: "bg-primary-600",
    status: "Active",
    statusStyle: "bg-green-100 text-green-800",
  },
  {
    name: "Leadership Assessment",
    description: "Evaluate leadership competencies",
    category: "Leadership",
    iconBg: "bg-purple-600",
    status: "Active",
    statusStyle: "bg-green-100 text-green-800",
  },
  {
    name: "Workplace Safety Quiz",
    description: "Safety protocols and procedures",
    category: "Safety",
    iconBg: "bg-yellow-600",
    status: "Active",
    statusStyle: "bg-green-100 text-green-800",
  },
  {
    name: "Communication Skills Test",
    description: "Interpersonal communication assessment",
    category: "Communication",
    iconBg: "bg-pink-600",
    status: "Draft",
    statusStyle: "bg-yellow-100 text-yellow-800",
  },
  {
    name: "Compliance Training Test",
    description: "Legal and regulatory compliance",
    category: "Compliance",
    iconBg: "bg-green-600",
    status: "Active",
    statusStyle: "bg-green-100 text-green-800",
  }
];

export default function CreateTestView() {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">テスト</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/8">カテゴリ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">ステータス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">アクション</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {TESTS_DATA.map(test => (
              <tr key={test.name} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className={`h-10 w-10 rounded-lg ${test.iconBg} flex items-center justify-center`}>
                        <FontAwesomeIcon icon={faClipboardCheck} className="text-white text-sm" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{test.name}</div>
                      <div className="text-sm text-gray-500">{test.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${test.statusStyle}`}>
                    {test.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    {/* Use Button for last row, plain button for the rest for parity with the original */}
                    <Button
                      variant="ghost"
                      className={cn('hover:text-neutral-500 p-0')}
                      onClick={() => modalRef.current?.modalOpen()}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <UiBasicModal
                      modalRef={modalRef}
                      title="Details"
                      description="This is a Details"
                      body={<TestDetails modalRef={modalRef} />}
                    />
                    <Button.Link
                      variant="ghost"
                      className={cn('hover:text-neutral-500 p-0')}
                      href={`/create-test/${test.name}`}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button.Link>
                    <Button
                      variant="ghost"
                      color="danger"
                      className={cn('hover:text-red-800 p-0')}
                      onClick={() => console.log('delete', test.name)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-700">
            <span>1〜5件 / 全5件のテストを表示</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              前へ
            </button>
            <button className="px-3 py-1 text-sm text-white bg-primary-600 border border-primary-600 rounded-md">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              次へ
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}

const TestDetails = ({ modalRef }: { modalRef: TUiBasicModalRefType }) => {
  return (<>
    <div id="modalContent" className="text-sm text-gray-500">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <p className="text-sm text-gray-900">Technical</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Questions</label>
              <p className="text-sm text-gray-900">20</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
              <p className="text-sm text-gray-900">2024-01-15</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-sm text-gray-900">Test fundamental JavaScript concepts including variables, functions, and control structures.</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Participant Results</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participant</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">JD</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">John Doe</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">john.doe@company.com</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2024-01-20</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">SW</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Sarah Wilson</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">sarah.wilson@company.com</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2024-01-19</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">MJ</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Mike Johnson</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">mike.johnson@company.com</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2024-01-18</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">EB</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Emily Brown</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">emily.brown@company.com</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2024-01-17</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">DL</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">David Lee</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">david.lee@company.com</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2024-01-16</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">LD</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Lisa Davis</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">lisa.davis@company.com</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2024-01-15</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">TM</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Tom Miller</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">tom.miller@company.com</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2024-01-14</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">AT</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">Amanda Taylor</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">amanda.taylor@company.com</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">2024-01-13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
      <button onClick={() => modalRef.current?.modalClose()} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200">
        閉じる
      </button>
    </div>

  </>);
}