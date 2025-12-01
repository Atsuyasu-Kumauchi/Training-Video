import { CTagDto } from '@/common';
import { Badge } from '@/common/components/badge';
import { LangTag } from '@/lang/tag';
import { TListColumnDef } from '@/tmsui/types';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { list } = LangTag;

export const tagListColumn: TListColumnDef<CTagDto>[] = [

  {
    accessorKey: "name",
    enableHiding: false,
    header: () => list.tagName,
    cell: (ctx) => {
      return <div>{ctx.row.original.tag}</div>
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
    accessorKey: "creationDate",
    enableHiding: false,
    header: () => list.creationDate,
    cell: (ctx) => {
      return <div>{ctx.row.original.creation_date}</div>
    }
  },
  {
    accessorKey: "actions",
    enableHiding: false,
    header: () => list.action,
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

