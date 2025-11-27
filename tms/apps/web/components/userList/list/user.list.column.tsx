import { Avatar } from '@/common'
import { Badge } from '@/common/components/badge'
import { CUserDto } from '@/common/dto/users'
import { TListColumnDef } from '@/tmsui/types'
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const userListColumn: TListColumnDef<CUserDto>[] = [
  {
    accessorKey: "ser",
    size: 50,
    enableHiding: false,
    header: () => "SL",
    cell: (ctx) => <div>{ctx.row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    enableHiding: false,
    header: () => "User",
    cell: (ctx) => {
      return <Avatar name={ctx.row.original.full_name} />
    }
  },
  {
    accessorKey: "email",
    enableHiding: false,
    header: () => "Email",
    cell: (ctx) => {
      return <div>{ctx.row.original.email}</div>
    }
  },
  {
    accessorKey: "department",
    enableHiding: false,
    header: () => "Department",
    cell: (ctx) => {
      return <div>{ctx.row.original.department}</div>
    }
  },
  {
    accessorKey: "assigned_training",
    enableHiding: false,
    header: () => "Assigned Training",
    cell: (ctx) => {
      return <div>{ctx.row.original.assigned_training}</div>
    }
  },
  {
    accessorKey: "completed_training",
    enableHiding: false,
    header: () => "Completed Training",
    cell: (ctx) => {
      return <div>{ctx.row.original.completed_training}</div>
    }
  },
  {
    accessorKey: "status",
    enableHiding: false,
    header: () => "Status",
    cell: (ctx) => {
      return <Badge status={ctx.row.original.status} />
    }
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    header: () => "Actions",
    cell: (ctx) => {
      return <div className="flex items-center space-x-2">
        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button className="text-primary-600 hover:text-primary-900 transition-colors duration-200">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    }
  }
]

