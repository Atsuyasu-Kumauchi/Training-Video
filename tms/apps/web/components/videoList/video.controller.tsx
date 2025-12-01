import VideoListFormComponent from "./form/videoList.form.component";
import VideoListFilter from "./list/video.filter";
import VideoListHeader from "./list/video.header";
import VideoListComponent from "./list/video.list.component";

export default function VideoController() {
    return (
        <div className="px-6 py-8">
            <VideoListHeader />
            <VideoListFilter />
            <VideoListComponent />
            <VideoListFormComponent />
        </div>
    )
}
