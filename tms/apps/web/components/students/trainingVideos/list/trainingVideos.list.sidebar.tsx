import useStudentLang from "@/lang/students";

export const TrainingVideosListSidebar = () => {
  const { myTraining } = useStudentLang();
  return (
    <>
      <div className="px-4 py-4.5 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <i className="fas fa-clipboard-list mr-2 text-primary-600" />
          {myTraining.list.issue_review}
          <span
            id="assignmentCount"
            className="ml-2 bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full"
          >
            3
          </span>
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Assignment Item 1 */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-xs">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
              {myTraining.list.reserved}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Explain the concept of closures in JavaScript with examples
          </p>
        </div>
        {/* Assignment Item 2 */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-xs">SW</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Sarah Wilson
                </p>
                <p className="text-xs text-gray-500">
                  sarah.wilson@example.com
                </p>
              </div>
            </div>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
              {myTraining.list.reserved}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Describe the difference between functional and class components
          </p>
        </div>
        {/* Assignment Item 3 */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-xs">MJ</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Mike Johnson
                </p>
                <p className="text-xs text-gray-500">
                  mike.johnson@example.com
                </p>
              </div>
            </div>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
              {myTraining.list.reserved}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            What are the key qualities of an effective leader?
          </p>
        </div>
      </div>
    </>
  );
};
