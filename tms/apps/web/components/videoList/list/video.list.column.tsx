
import { Badge } from '@/common/components/badge';
import { CVideoListDto, IVideoListDto } from '@/common/dto/videoList.dto';
import useLang from '@/lang';
import { LangVideoList } from '@/lang/videoList';
import { Button, TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from '@/tmsui';
import { TListColumnDef } from '@/tmsui/types';
import { useRef } from 'react';
import VideoListFormComponent from '../form/videoList.form.component';

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
                title="User View"
                body={<div>User View</div>}
            />
        </div>
    )
}
export const VideoEdit = (video: IVideoListDto) => {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    const { videoList } = useLang();
    const isEdit = !!video.videoId || false;

    return (
        <>
            <Button onClick={() => modalRef.current.modalOpen()} variant="ghost" color='primary' className='p-0' startIcon='edit' />
            <UiBasicModal
                modalRef={modalRef}
                title={videoList.form.title}
                body={<VideoListFormComponent isEdit={isEdit} editData={video} modalRef={modalRef} />}
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

