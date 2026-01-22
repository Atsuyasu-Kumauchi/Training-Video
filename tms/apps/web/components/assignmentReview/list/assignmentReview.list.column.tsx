import { CAssignmentReviewDto } from '@/common';
import { LangAssignmentReview } from '@/lang/assignmentReview';
import { TListColumnDef } from '@/tmsui/types';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { list } = LangAssignmentReview;

export const assignmentReviewListColumn: TListColumnDef<CAssignmentReviewDto>[] = [

    {
        accessorKey: "user",
        enableHiding: false,
        header: () => list.user,
        cell: (ctx) => {
            return <div>{ctx.row.original.user}</div>
        }
    },
    {
        accessorKey: "assignmentTitle",
        enableHiding: false,
        header: () => list.assignmentTitle,
        cell: (ctx) => {
            return <div>{ctx.row.original.assignmentTitle}</div>
        }
    },
    {
        accessorKey: "status",
        enableHiding: false,
        header: () => list.status,
        cell: (ctx) => {
            return <div>{ctx.row.original.status}</div>
        }
    },
    {
        accessorKey: "submittedDate",
        enableHiding: false,
        header: () => list.submittedDate,
        cell: (ctx) => {
            return <div>{ctx.row.original.submittedDate}</div>
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
            </div>
        }
    }
]

