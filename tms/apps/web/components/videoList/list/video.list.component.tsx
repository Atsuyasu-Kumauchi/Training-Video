import { CVideoListDto, ListQueryConfig } from "@/common";
import { useList } from "@/hooks/useList";
import { ListTable } from "@/tmsui";
import { videoListColumn } from "./video.list.column";

export default function VideoListComponent() {
    const listHook = useList<CVideoListDto>({
        columns: videoListColumn,
        query: ListQueryConfig.VIDEO_LIST
    })

    return (
        <ListTable {...listHook} />
    )
}
