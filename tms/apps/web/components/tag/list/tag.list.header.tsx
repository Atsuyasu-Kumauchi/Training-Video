import useLang from "@/lang";
import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from "@/tmsui";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import TagFormComponent from "../form/tag.form.component";

export default function TagListHeader() {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    const { tag } = useLang();
    return (
        <div className="flex items-center justify-between mb-8" >
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{tag.header.title}</h1>
            </div>
            <Button onClick={() => modalRef.current.modalOpen()}>
                <FontAwesomeIcon
                    icon={faPlus}
                    className="fas fa-users w-5 h-5 mr-3 text-white"
                />
                {tag.header.add}
            </Button>
            <UiBasicModal
                modalRef={modalRef}
                title={tag.form.title}
                body={<TagFormComponent isEdit={false} modalRef={modalRef} />}
            />
        </div>
    )
}