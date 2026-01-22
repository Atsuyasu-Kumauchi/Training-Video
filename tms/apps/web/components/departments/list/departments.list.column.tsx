import { CDepartmentDto, IDepartmentDto } from '@/common';
import { Badge } from '@/common/components/badge';
import useLang from '@/lang';
import { LangDepartment } from '@/lang/department';
import { TListColumnDef } from '@/tmsui/types';
import { Button } from '@/tmsui/ui/basic/button';
import { TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui/ui/UIBasicModal';
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
    cell: (ctx) => {
      return (
        <div className="flex items-center space-x-2">
          <DepartmentEdit {...ctx.row.original} />
          <DepartmentDelete />
        </div>
      )
    }
  }
]


export const DepartmentEdit = (department: IDepartmentDto) => {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  const { department: departmentLang } = useLang();
  const isEdit = !!department.departmentId || false;
  return (
    <>
      <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='edit' />
      <UiBasicModal
        modalRef={modalRef}
        title={departmentLang.form.editTitle}
        body={<DepartmentsFormComponent isEdit={isEdit} editData={department} modalRef={modalRef} />}
      />
    </>
  )
}

export const DepartmentDelete = () => {
  return (
    <>
      <Button color='danger' variant="ghost" className='p-0' disabled startIcon='delete' />
    </>
  )
}