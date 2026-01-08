import BasicMediaPlayer from "./mediaPlayer/basic.mediaPlayer";
import YoutubeMediaPlayer from "./mediaPlayer/youtube.mediaPlayer";
import { TrainingVideoPlayerViewProps } from "./trainingVideo.player.type";

export default function TrainingVideoPlayerView({ videoDetails, modalRef }: TrainingVideoPlayerViewProps) {
    if (videoDetails?.uploadType === "youtube") {
        return <YoutubeMediaPlayer videoDetails={videoDetails} modalRef={modalRef} />;
    }
    return (
        <BasicMediaPlayer videoDetails={videoDetails} modalRef={modalRef} />
    )
}
