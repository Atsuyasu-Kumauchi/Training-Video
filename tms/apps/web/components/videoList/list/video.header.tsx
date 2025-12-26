import useLang from "@/lang";
import { TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from "@/tmsui";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import VideoListFormComponent from "../form/videoList.form.component";

export default function VideoListHeader() {
    const { videoList } = useLang();
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">{videoList.header.title}</h2>
            </div>
            <button onClick={() => modalRef.current.modalOpen()} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                <FontAwesomeIcon
                    icon={faPlus}
                    className="fas fa-users w-5 h-5 mr-3 text-white"
                />
                {videoList.header.addNewVideo}
            </button>
            <UiBasicModal
                modalRef={modalRef}
                title={videoList.form.title}
                body={<VideoListFormComponent modalRef={modalRef} />}
            />
        </div>
    )
}
