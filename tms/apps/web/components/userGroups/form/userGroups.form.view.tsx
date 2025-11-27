import {
  Button,
  Modal,
  TFormHandlerSubmit,
  TUiFormRef,
  UiForm,
  UiFormInput,
  UiFormSelect,
  UiFormTextArea,
} from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { useRef } from "react";
import {
  departments,
  initialValues,
  members,
  status,
  TUserGroupsSchema,
  userGroupsSchema,
} from "./userGroups.form.type";

export default function UserGroupsFormView() {
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TUserGroupsSchema>>(null);

  const onSubmitHandler: TFormHandlerSubmit<TUserGroupsSchema> = (value) => {
    console.log(value);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add New Group"
    >
      <UiForm
        schema={userGroupsSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <div className="px-6 py-8">
          <div className="space-y-4">
            <UiFormInput<TUserGroupsSchema>
              name="name"
              label="Name"
              placeholder="Enter your text here.."
            />
            <UiFormTextArea<TUserGroupsSchema>
              name="description"
              label="Textarea"
            />
            <UiFormSelect<TUserGroupsSchema>
              name="department"
              label="Department"
              options={departments}
            />
            <UiFormSelect<TUserGroupsSchema>
              name="members"
              label="Select Members"
              options={members}
            />
            <UiFormSelect<TUserGroupsSchema>
              name="status"
              label="Status"
              options={status}
            />
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                color="neutral"
                onClick={() => setIsOpen(false)}
              >
                Cancle
              </Button>
              <Button type="submit">Create Group</Button>
            </div>
          </div>
        </div>
      </UiForm>
    </Modal>
  );
}
