import { CDepartmentDto, IDepartmentDto } from '@/common';
import { Badge } from '@/common/components/badge';
import { LangDepartment } from '@/lang/department';
import { TListColumnDef } from '@/tmsui/types';
import { Button } from '@/tmsui/ui/basic/button';
import { TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui/ui/UIBasicModal';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import DepartmentsFormComponent from '../form/departments.form.component';

const { list } = LangDepartment;

export const departmentsListColumn: TListColumnDef<CDepartmentDto>[] = [

  {
    accessorKey: "name",
    enableHiding: false,
    header: () => list.departmentName,
    cell: (ctx) => {
      return <div>{ctx.row.original.name}</div>
    }
  },
  {
    accessorKey: "status",
    enableHiding: false,
    header: () => list.status,
    cell: (ctx) => {
      return <Badge status={ctx.row.original.status ? "Active" : "Inactive"} />
    }
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    header: () => list.action,
    cell: (ctx) => <ActionDepartment {...ctx.row.original} />
  }
]

export const ActionDepartment = (department: IDepartmentDto) => {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  const editDepartment = () => modalRef.current.modalOpen();
  const deleteDepartment = () => modalRef.current.modalOpen();
  return (
    <div className="flex items-center space-x-1">
      <Button onClick={editDepartment} variant="ghost" color='primary' className='p-0'>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Button onClick={deleteDepartment} color='danger' variant="ghost" className='p-1' disabled>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <UiBasicModal
        modalRef={modalRef}
        title="Edit Department"
        description="Edit Department"
        body={<DepartmentsFormComponent modalRef={modalRef} editData={department} />}
      />
    </div>
  )
}