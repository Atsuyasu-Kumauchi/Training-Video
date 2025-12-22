import { Avatar } from '@/common';
import { Badge } from '@/common/components/badge';
import { CUserDto, IUserDto } from '@/common/dto/user.dto';
import useLang from '@/lang';
import { LangUser } from '@/lang/user';
import { Button } from '@/tmsui';
import { TListColumnDef } from '@/tmsui/types';
import { TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui/ui/UIBasicModal';
import { useRef } from 'react';
import UserFormComponent from '../form/user.form.component';

const { list } = LangUser;

export const userListColumn: TListColumnDef<CUserDto>[] = [

  {
    accessorKey: "name",
    enableHiding: false,
    header: () => list.user,
    cell: (ctx) => {
      return <Avatar name={ctx.row.original.username} />
    }
  },
  {
    accessorKey: "email",
    enableHiding: false,
    header: () => list.email,
    cell: (ctx) => {
      return <div>{ctx.row.original.email}</div>
    }
  },
  {
    accessorKey: "department",
    enableHiding: false,
    header: () => list.department,
    cell: (ctx) => {
      return <div>{'N/A'}</div>
    }
  },
  {
    accessorKey: "assigned_training",
    enableHiding: false,
    header: () => list.assignedTraining,
    cell: (ctx) => {
      return <div>{'N/A'}</div>
    }
  },
  {
    accessorKey: "completed_training",
    enableHiding: false,
    header: () => list.completedTraining,
    cell: (ctx) => {
      return <div>{'N/A'}</div>
    }
  },
  {
    accessorKey: "status",
    enableHiding: false,
    header: () => list.status,
    cell: ({ row: { original } }) => {
      return <Badge status={original.status ? "Active" : "Inactive"} />
    }
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    header: () => list.actions,
    cell: (ctx) => {
      return (
        <div className="flex items-center space-x-2">
          <UserView {...ctx.row.original} />
          <UserEdit {...ctx.row.original} />
          <UserDelete />
        </div>
      )
    }
  }
]


export const UserView = (user: IUserDto) => {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  return (
    <div className="flex items-center space-x-2">
      <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='view' />
      <UiBasicModal
        modalRef={modalRef}
        title="User View"
        body={<div>User View</div>}
      />
    </div>
  )
}
export const UserEdit = (user: IUserDto) => {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  const { user: userLang } = useLang();
  const isEdit = !!user.userId || false;
  return (
    <>
      <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='edit' />
      <UiBasicModal
        modalRef={modalRef}
        // title={userLang.form.editTitle}
        title="Edit User"
        body={<UserFormComponent isEdit={isEdit} editData={user} modalRef={modalRef} />}
      />
    </>
  )
}
export const UserDelete = () => {
  return (
    <>
      <Button color='danger' variant="ghost" className='p-0' disabled startIcon='delete' />
    </>
  )
}