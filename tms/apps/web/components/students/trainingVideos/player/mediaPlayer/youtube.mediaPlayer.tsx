import { cn, UiHeadLessModal } from "@/tmsui";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import QuestionComponent from "../question/question.component";
import { TMediaPlayerProps } from "./mediaPlayer.type";

declare global {
    interface Window {
        YT?: typeof YT;
        onYouTubeIframeAPIReady?: () => void;
    }
}

export default function YoutubeMediaPlayer({ videoDetails, modalRef, questionModalRef }: TMediaPlayerProps) {

    const [player, setPlayer] = useState<YT.Player | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [questionModalOpen, setQuestionModalOpen] = useState(false);
    const [timestamp, setTimestamp] = useState<string>('');

    useEffect(() => {
        let isMounted = true;

        const initializePlayer = () => {
            if (!isMounted) return;

            const newPlayer = new window.YT.Player('player', {
                events: {
                    onReady: () => {
                        console.log('Player ready');
                    },
                    onStateChange: (e: YT.OnStateChangeEvent) => {
                        const seconds = e.target.getCurrentTime();
                        const minutes = Math.floor(seconds / 60);
                        const secs = Math.floor(seconds % 60);
                        const humanReadable = `${minutes}:${secs.toString().padStart(2, '0')}`;
                        console.log(humanReadable);
                        if (e.data === YT.PlayerState.ENDED) {
                            console.log('Video ended');
                        }
                        if (e.data === YT.PlayerState.PAUSED) {
                            console.log('Video paused');
                        }
                        if (e.data === YT.PlayerState.PLAYING) {
                            console.log('Video playing');
                        }
                        if (e.data === YT.PlayerState.BUFFERING) {
                            console.log('Video buffering');
                        }
                    }
                }
            });

            setPlayer(newPlayer);
        };

        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = initializePlayer;
        } else {
            initializePlayer();
        }

        return () => {
            isMounted = false;
            if (player) {
                player.destroy();
            }
        };
    }, []);

    const handlePlayAtTime = () => {
        if (!player) return;

        const time = parseFloat(timestamp) || 0;
        player.seekTo(time, true);
        player.playVideo();
    };

    const handlePause = () => {
        if (player) {
            player.pauseVideo();
        }
    };

    console.log("videoDetails ======= youtube", videoDetails);

    const ref = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            ref.current?.requestFullscreen().catch((err) => {
                console.error("Failed to enter fullscreen:", err);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch((err) => {
                console.error("Failed to exit fullscreen:", err);
            });
            setIsFullscreen(false);
        }
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         questionModalRef.current.modalOpen();
    //     }, 2000);
    // }, []);

    return (
        <div className="space-y-4">
            <div ref={ref} className={cn("aspect-video bg-gray-100 relative group player-modal")}>
                <iframe
                    src={"https://www.youtube.com/embed/" + videoDetails?.videoUrl + "?enablejsapi=1&fs=0"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="border-0 w-full h-full rounded-lg"
                />
                <button onClick={toggleFullscreen} className="absolute bottom-16 right-6 z-50 bg-white/70 rounded p-2 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <FontAwesomeIcon icon={fas.faExpand} size={"xl"} />
                </button>
                <UiHeadLessModal
                    modalRef={questionModalRef}
                    body={
                        <QuestionComponent
                            questionModalRef={questionModalRef}
                            test={videoDetails?.test}
                        />
                    }
                />

            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">動画説明</h4>
                <p className="text-gray-700">{videoDetails?.description}</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <FontAwesomeIcon icon={fas.faCheck} className="mr-2" />
                        完了
                    </span>
                </div>

                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200" onClick={() => questionModalRef.current.modalOpen()}>
                        <FontAwesomeIcon icon={fas.faQuestionCircle} className="mr-2" />
                        問題を表示
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200" onClick={() => modalRef.current.modalClose()}>
                        閉じる
                    </button>
                </div>
            </div>


            {/* 
            <div className="flex items-center gap-2 p-4 border rounded-lg bg-gray-50">
                <input
                    type="number"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    placeholder="Enter time in seconds"
                    className="border p-2 rounded flex-1"
                />
                <button
                    onClick={handlePlayAtTime}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    Play from Time
                </button>
                <button
                    onClick={handlePause}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    Pause
                </button>
            </div> */}
        </div>
    );
}