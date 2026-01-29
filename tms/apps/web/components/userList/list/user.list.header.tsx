import useLang from "@/lang";
import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from "@/tmsui";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import UserFormComponent from "../form/user.form.component";

export default function UserListHeader() {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    const { user } = useLang();
    return (
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.header.title}</h2>
            </div>
            <div className="flex items-center flex-wrap gap-4">
                {/* CSV Import Button */}
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faDownload} className="fas fa-users w-5 h-5 mr-3 text-black" />
                    {user.header.csvImport}
                </button>
                {/* CSV Export Button */}
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faUpload} className="fas fa-users w-5 h-5 mr-3 text-black" />
                    {user.header.csvExport}
                </button>
                {/* Add New User Button */}
                <Button onClick={() => modalRef.current.modalOpen()} startIcon='plus'>
                    {user.header.addNewUser}
                </Button>
            </div>
            <UiBasicModal
                modalRef={modalRef}
                title={user.form.addUser}
                body={<UserFormComponent modalRef={modalRef} />}
            />
        </div>
    )
}