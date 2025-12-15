
import useLang from "@/lang";

import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from "@/tmsui";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import DepartmentsFormComponent from "../form/departments.form.component";

export default function DepartmentsListHeader() {
    const { department } = useLang();
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    return (
        <Fragment>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{department.header.title}</h2>
                </div>
                <Button onClick={() => modalRef.current.modalOpen()}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="fas fa-users w-5 h-5 mr-3 text-white"
                    />
                    {department.header.add}
                </Button>
                <UiBasicModal
                    modalRef={modalRef}
                    title={department.form.title}
                    body={<DepartmentsFormComponent />}
                />
            </div>
        </Fragment>
    )
}
