import { TUiHeadLessModalRef, uiHeadLessModalRefDefaultValue } from "@/tmsui";
import { useRef } from "react";
import BasicMediaPlayer from "./mediaPlayer/basic.mediaPlayer";
import YoutubeMediaPlayer from "./mediaPlayer/youtube.mediaPlayer";
import { TrainingVideoPlayerViewProps } from "./trainingVideo.player.type";

export default function TrainingVideoPlayerView({ videoDetails, modalRef, training }: TrainingVideoPlayerViewProps) {
    const questionModalRef = useRef<TUiHeadLessModalRef>(uiHeadLessModalRefDefaultValue());


    if (videoDetails?.uploadType === "youtube") {
        return (
            <YoutubeMediaPlayer
                videoDetails={videoDetails}
                training={training}
                modalRef={modalRef}
                questionModalRef={questionModalRef}
            />
        );
    }
    return (
        <BasicMediaPlayer
            training={training}
            videoDetails={videoDetails}
            modalRef={modalRef}
            questionModalRef={questionModalRef}
        />
    )
}
