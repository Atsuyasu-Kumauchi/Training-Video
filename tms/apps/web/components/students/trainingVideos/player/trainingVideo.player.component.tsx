import { TrainingVideoPlayerComponentProps } from "./trainingVideo.player.type";
import TrainingVideoPlayerView from "./trainingVideo.player.view";


export default function TrainingVideoPlayerComponent(props: TrainingVideoPlayerComponentProps) {
    return (
        <TrainingVideoPlayerView {...props} />
    )
}
