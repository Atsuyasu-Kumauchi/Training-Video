import { CDepartmentDto } from '@/common';
import { Badge } from '@/common/components/badge';
import { LangDepartment } from '@/lang/department';
import { TListColumnDef } from '@/tmsui/types';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      return <Badge status={ctx.row.original.status} />
    }
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    header: () => list.action,
    cell: (ctx) => {
      return <div className="flex items-center space-x-2">
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

