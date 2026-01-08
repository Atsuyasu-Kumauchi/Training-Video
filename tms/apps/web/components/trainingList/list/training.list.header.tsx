import { useLang } from '@/lang';
import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';
import TrainingFormComponent from '../form/training.form.component';

export default function TrainingListHeader() {
    const { trainingList } = useLang();
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    return (
        <Fragment>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {trainingList.header.title}
                    </h2>
                </div>
                <Button onClick={() => modalRef.current?.modalOpen()}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="fas fa-users w-5 h-5 mr-3 text-white"
                    />
                    {trainingList.header.addNewTraining}
                </Button>
            </div>
            <UiBasicModal
                modalRef={modalRef}
                title={trainingList.header.addNewTraining}
                body={<TrainingFormComponent modalRef={modalRef} />}
            />
        </Fragment>
    )
}
