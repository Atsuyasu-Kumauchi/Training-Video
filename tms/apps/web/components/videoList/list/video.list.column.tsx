
import { Badge } from '@/common/components/badge';
import { CVideoListDto, IVideoListDto } from '@/common/dto/videoList.dto';
import useLang from '@/lang';
import { LangVideoList } from '@/lang/videoList';
import { Button, formateDate, MediaServer, TListColumnDef, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui';
import { useRef } from 'react';
import VideoDetailsComponent from '../details/video.details.component';
import VideoListFormComponent from '../form/videoList.form.component';

const { list } = LangVideoList;

export const videoListColumn: TListColumnDef<CVideoListDto>[] = [

    {
        accessorKey: "title",
        enableHiding: false,
        header: () => list.video,
        cell: ({ row: { original } }) => {
            return (
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-24">
                        <div className="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center ">
                            <img src={
                                original.uploadType === "file" ? MediaServer(original?.thumbnailUrl) : original.uploadType === "youtube" ? original?.thumbnailUrl : "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
                            } alt={original?.name} width={150} height={150} className="w-24 h-16 object-cover rounded-lg" />
                        </div>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{original?.name}</div>
                        <div className="text-sm text-gray-500">{original?.description}</div>
                    </div>
                </div>
            )
        }
    },
    // {
    //     accessorKey: "category",
    //     enableHiding: false,
    //     header: () => list.category,
    //     cell: (ctx) => {
    //         return <div>{ctx.row.original.category}</div>
    //     }
    // },
    {
        accessorKey: "playbackTime",
        enableHiding: false,
        header: () => list.playbackTime,
        cell: (ctx) => {
            return <div>{ctx.row.original.playbackTime}</div>
        }
    },
    {
        accessorKey: "uploadDate",
        enableHiding: false,
        header: () => list.uploadDate,
        cell: (ctx) => {
            return <div>{formateDate(ctx.row.original.created)}</div>
        }
    },
    {
        accessorKey: "status",
        enableHiding: false,
        header: () => list.status,
        cell: (ctx) => {
            return <Badge status={ctx.row.original.status ? "Active" : "Inactive"} />
        }
    },
    {
        accessorKey: "actions",
        enableHiding: false,
        header: () => list.actions,
        cell: (ctx) => {
            return <div className="flex items-center space-x-2">
                <VideoView {...ctx.row.original} />
                <VideoEdit {...ctx.row.original} />
                <VideoDelete />
            </div>
        }
    }
]


export const VideoView = (video: IVideoListDto) => {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    return (
        <div className="flex items-center space-x-2">
            <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='view' />
            <UiBasicModal
                modalRef={modalRef}
                title={"Video Details - " + video?.name}
                body={<VideoDetailsComponent editData={video} modalRef={modalRef} />}
            />
        </div>
    )
}

export const VideoEdit = (video: IVideoListDto) => {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    const { videoList } = useLang();
    const isEdit = !!video.videoId || false;

    const videoModified = {
        ...video,
        fileResponse: {
            "fileName": video.uploadType === "file" ? video?.fileName : video?.fileName,
            "playbackUrl": video.uploadType === "file" ? video?.videoUrl : video?.videoUrl,
        },
    }

    return (
        <>
            <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='edit' />
            <UiBasicModal
                modalRef={modalRef}
                title={videoList.form.title}
                body={<VideoListFormComponent isEdit={isEdit} editData={videoModified} modalRef={modalRef} />}
            />
        </>
    )
}

export const VideoDelete = () => {
    return (
        <>
            <Button color='danger' variant="ghost" className='p-0' disabled startIcon='delete' />
        </>
    )
}

