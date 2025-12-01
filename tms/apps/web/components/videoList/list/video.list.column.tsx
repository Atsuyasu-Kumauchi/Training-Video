
import { Badge } from '@/common/components/badge';
import { CVideoListDto } from '@/common/dto/videoList.dto';
import { LangVideoList } from '@/lang/videoList';
import { TListColumnDef } from '@/tmsui/types';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { list } = LangVideoList;

export const videoListColumn: TListColumnDef<CVideoListDto>[] = [

    {
        accessorKey: "title",
        enableHiding: false,
        header: () => list.video,
        cell: (ctx) => {
            return <div>{ctx.row.original.title}</div>
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
        accessorKey: "playbackTime",
        enableHiding: false,
        header: () => list.playbackTime,
        cell: (ctx) => {
            return <div>{ctx.row.original.playback_time}</div>
        }
    },
    {
        accessorKey: "uploadDate",
        enableHiding: false,
        header: () => list.uploadDate,
        cell: (ctx) => {
            return <div>{ctx.row.original.upload_date}</div>
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

