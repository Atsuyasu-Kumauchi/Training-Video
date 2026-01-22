import { CVideoListDto, ListQueryConfig } from "@/common";
import { useList } from "@/hooks/useList";
import { ListTable } from "@/tmsui";
import { useSearchParams } from "next/navigation";
import { videoListColumn } from "./video.list.column";

export default function VideoListComponent() {
    const searchParams = useSearchParams();
    const listHook = useList<CVideoListDto>({
        columns: videoListColumn,
        query: ListQueryConfig.VIDEO_LIST,
        filters: {
            tagsFilter: searchParams.get("tagsFilter"),
            statusFilter: searchParams.get("statusFilter"),
            nameFilter: searchParams.get("nameFilter"),
        }
    })

    return (
        <ListTable {...listHook} />
    )
}
