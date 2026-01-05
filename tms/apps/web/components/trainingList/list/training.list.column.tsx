
import { CTrainingsDto } from '@/common';
import { Badge } from '@/common/components/badge';
import { LangTrainingList } from '@/lang/trainingList';
import { TListColumnDef } from '@/tmsui/types';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { list } = LangTrainingList;

export const trainingListColumn: TListColumnDef<CTrainingsDto>[] = [

    {
        accessorKey: "training",
        enableHiding: false,
        header: () => list.training,
        cell: (ctx) => {
            return <div>{ctx.row.original.training}</div>
        }
    },
    // {
    //     accessorKey: "register",
    //     enableHiding: false,
    //     header: () => list.registered,
    //     cell: (ctx) => {
    //         return <div>{ctx.row.original.register}</div>
    //     }
    // },
    // {
    //     accessorKey: "completion",
    //     enableHiding: false,
    //     header: () => list.completion,
    //     cell: (ctx) => {
    //         return <div>{ctx.row.original.completion}</div>
    //     }
    // },
    // {
    //     accessorKey: "incomplete",
    //     enableHiding: false,
    //     header: () => list.incomplete,
    //     cell: (ctx) => {
    //         return <div>{ctx.row.original.incomplete}</div>
    //     }
    // },
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

