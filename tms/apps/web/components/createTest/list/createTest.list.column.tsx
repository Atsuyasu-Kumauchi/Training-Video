import { CTestCreationDto } from '@/common';
import { Badge } from '@/common/components/badge';
import { LangTestCreation } from '@/lang/testCreation';
import { TListColumnDef } from '@/tmsui/types';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { list } = LangTestCreation;

export const createTestListColumn: TListColumnDef<CTestCreationDto>[] = [

    {
        accessorKey: "test",
        enableHiding: false,
        header: () => list.test,
        cell: (ctx) => {
            return <div>{ctx.row.original.test}</div>
        }
    },
    {
        accessorKey: "category",
        enableHiding: false,
        header: () => list.category,
        cell: (ctx) => {
            return <div>{ctx.row.original.category}</div>
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
        cell: () => {
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

