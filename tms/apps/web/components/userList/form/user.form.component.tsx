import { Modal, TFormHandlerSubmit, TUiFormRef, UiForm } from '@/tmsui';
import { useSettings } from '@/tmsui/store/settings';
import { useRef } from 'react';
import { initialValues, TUserSchema, userSchema } from './user.form.type';
import UserFormView from './user.form.view';

export default function UserFormComponent() {
    const { isOpen, setIsOpen } = useSettings();
    const formRef = useRef<TUiFormRef<TUserSchema>>(null)


    const onSubmit: TFormHandlerSubmit<TUserSchema> = (value) => {
        console.log("value of user form", value);
    }


    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New User">
            <UiForm
                schema={userSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <UserFormView />
            </UiForm>
        </Modal>
    )
}
