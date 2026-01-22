import { Badge, CRoleDto, IRoleDto } from '@/common';
import useLang from '@/lang';
import { LangRole } from '@/lang/role';
import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui';
import { TListColumnDef } from '@/tmsui/types';
import { useRef } from 'react';
import RolesFormComponent from '../form/roles.form.component';

const { list } = LangRole;

export const rolesListColumn: TListColumnDef<CRoleDto>[] = [

  {
    accessorKey: "name",
    enableHiding: false,
    header: () => list.roleName,
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
        <div className="flex items-center space-x-1">
          <UserEditAction {...ctx.row.original} />
          <UserDeleteAction />
        </div>
      )
    }
  }
]


export const UserEditAction = (role: IRoleDto) => {
  const { role: roleLang } = useLang();
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  return (
    <>
      <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='edit' />
      <UiBasicModal
        modalRef={modalRef}
        title={roleLang.form.editTitle}
        body={<RolesFormComponent isEdit={true} editData={role} modalRef={modalRef} />}
      />
    </>
  )
}

export const UserDeleteAction = () => {
  return (
    <>
      <Button color='danger' variant="ghost" className='p-1' disabled startIcon='delete' />
    </>
  )
}