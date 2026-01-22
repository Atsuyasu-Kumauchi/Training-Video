import { TVideoListFormComponentSchema } from "../form/videoList.form.type";
import VideoDetailsView from "./video.details.view";

export default function VideoDetailsComponent(props: TVideoListFormComponentSchema) {
    return (
        <VideoDetailsView {...props} />
    )
}
