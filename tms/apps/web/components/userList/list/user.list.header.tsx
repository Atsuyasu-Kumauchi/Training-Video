import { useSettings } from "@/tmsui/store/settings";
import { faDownload, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserListHeader() {
    const { setIsOpen } = useSettings();
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Users</h2>
            </div>
            <div className="flex items-center space-x-3">
                {/* CSV Import Button */}
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faDownload} className="fas fa-users w-5 h-5 mr-3 text-black" />
                    Import CSV
                </button>
                {/* CSV Export Button */}
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faUpload} className="fas fa-users w-5 h-5 mr-3 text-black" />
                    Export CSV
                </button>
                {/* Add New User Button */}
                <button onClick={() => setIsOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faPlus} className="fas fa-users w-5 h-5 mr-3 text-white" />
                    Add New User
                </button>
            </div>
        </div>
    )
}