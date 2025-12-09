import { Avatar } from '@/common';
import { Badge } from '@/common/components/badge';
import { CUserDto } from '@/common/dto/user.dto';
import { LangUser } from '@/lang/user';
import { Button } from '@/tmsui';
import { TListColumnDef } from '@/tmsui/types';
import { TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui/ui/UIBasicModal';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

const { list } = LangUser;

export const userListColumn: TListColumnDef<CUserDto>[] = [

  {
    accessorKey: "name",
    enableHiding: false,
    header: () => list.user,
    cell: (ctx) => {
      return <Avatar name={ctx.row.original.full_name} />
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
      return <div>{ctx.row.original.department}</div>
    }
  },
  {
    accessorKey: "assigned_training",
    enableHiding: false,
    header: () => list.assignedTraining,
    cell: (ctx) => {
      return <div>{ctx.row.original.assigned_training}</div>
    }
  },
  {
    accessorKey: "completed_training",
    enableHiding: false,
    header: () => list.completedTraining,
    cell: (ctx) => {
      return <div>{ctx.row.original.completed_training}</div>
    }
  },
  {
    accessorKey: "status",
    enableHiding: false,
    header: () => list.status,
    cell: (ctx) => {
      return <Badge status={ctx.row.original.status} />
    }
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    header: () => list.actions,
    cell: (ctx) => {
      return <UserActions />
    }
  }
]

export const UserActions = () => {
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  return (
    <div className="flex items-center space-x-2">
      <Button onClick={() => modalRef.current.modalOpen()}>
        <FontAwesomeIcon icon={faEye} />
      </Button>
      <UiBasicModal modalRef={modalRef} title="User Details" description="User Details" body={<div>User Details</div>} />
      <Button onClick={() => modalRef.current.modalOpen()}>
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Button>
        <FontAwesomeIcon icon={faTrash} />
      </Button>


    </div>
  )
}