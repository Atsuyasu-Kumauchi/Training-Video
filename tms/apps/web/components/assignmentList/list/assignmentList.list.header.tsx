import { useLang } from '@/lang';
import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';
import AssignmentListFormComponent from '../form/assignmentList.form.component';

export default function CreateTestListHeader() {
    const { listOfIssues } = useLang();
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    return (
        <Fragment>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{listOfIssues.header.title}</h2>
                    <p className="text-gray-600 mt-1">{listOfIssues.header.description}</p>
                </div>
                <Button onClick={() => modalRef.current?.modalOpen()} color="primary" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                    <FontAwesomeIcon icon={faPlus} className="fas fa-plus w-5 h-5 mr-2 text-white" />
                    {listOfIssues.header.addNewAssignment}
                </Button>
            </div>

            <UiBasicModal
                modalRef={modalRef}
                title={listOfIssues.header.addNewAssignment}
                body={<AssignmentListFormComponent modalRef={modalRef} />}
            />

        </Fragment>
    )
}
