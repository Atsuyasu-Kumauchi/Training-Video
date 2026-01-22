import { useLang } from "@/lang";
import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from "@/tmsui";
import { useRef } from "react";
import RolesFormComponent from "../form/roles.form.component";
export default function RolesListHeader() {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  const { role } = useLang();
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{role.header.title}</h2>
      </div>
      <Button onClick={() => modalRef.current.modalOpen()} startIcon='plus'>
        {role.header.add}
      </Button>
      <UiBasicModal
        modalRef={modalRef}
        title={role.form.title}
        body={<RolesFormComponent modalRef={modalRef} isEdit={false} />}
      />
    </div>
  );
}
