import VideoPlayer from "@/components/VideoPlayer";

export default function TrainingVideoPlayerView() {
    return (
        <VideoPlayer
            videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            videoId="1"
            title="Big Buck Bunny"
        />
    )
}
