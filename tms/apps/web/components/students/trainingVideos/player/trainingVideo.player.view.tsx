import { TUiHeadLessModalRef, uiHeadLessModalRefDefaultValue } from "@/tmsui";
import { useRef } from "react";
import BasicMediaPlayer from "./mediaPlayer/basic.mediaPlayer";
import YoutubeMediaPlayer from "./mediaPlayer/youtube.mediaPlayer";
import { TrainingVideoPlayerViewProps } from "./trainingVideo.player.type";

export default function TrainingVideoPlayerView({ videoDetails, modalRef }: TrainingVideoPlayerViewProps) {
    const questionModalRef = useRef<TUiHeadLessModalRef>(uiHeadLessModalRefDefaultValue());
    if (videoDetails?.uploadType === "youtube") {
        return (
            <YoutubeMediaPlayer
                videoDetails={videoDetails}
                modalRef={modalRef}
                questionModalRef={questionModalRef}
            />
        );
    }
    return (
        <BasicMediaPlayer
            videoDetails={videoDetails}
            modalRef={modalRef}
            questionModalRef={questionModalRef}
        />
    )
}
