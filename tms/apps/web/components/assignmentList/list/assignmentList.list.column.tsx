import { CAssignmentListDto } from '@/common';
import { LangListOfIssues } from '@/lang/listOfIssues';
import { TListColumnDef } from '@/tmsui/types';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { list } = LangListOfIssues;

export const assignmentListColumn: TListColumnDef<CAssignmentListDto>[] = [

    {
        accessorKey: "question",
        enableHiding: false,
        header: () => list.question,
        cell: (ctx) => {
            return <div>{ctx.row.original.question}</div>
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

