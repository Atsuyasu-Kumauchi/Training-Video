import { cn } from "@/tmsui";
import { fas, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { TrainingVideoPlayerViewProps } from "../trainingVideo.player.type";

declare global {
    interface Window {
        YT?: typeof YT;
        onYouTubeIframeAPIReady?: () => void;
    }
}

export default function YoutubeMediaPlayer({ videoDetails, modalRef }: TrainingVideoPlayerViewProps) {
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

    console.log("videoDetails youtube", videoDetails);

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


    return (
        <div className="space-y-4">
            <div ref={ref} className={cn("aspect-video bg-gray-100 rounded-lg relative group player-modal")}>
                <iframe
                    src={"https://www.youtube.com/embed/" + videoDetails?.videoUrl + "?enablejsapi=1&fs=0"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="border-0 w-full h-full rounded-lg"
                />

                <button
                    onClick={toggleFullscreen}
                    className="absolute bottom-16 right-6 z-50 bg-white/70 rounded p-2 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    <FontAwesomeIcon icon={fas.faExpand} size={"xl"} />
                </button>

                {/* question modal */}
                <div className="bg-black/70 backdrop-blur rounded-lg shadow-2xl aspect-video absolute top-0 left-0 z-50 w-full h-full overflow-y-auto" style={{ display: questionModalOpen ? 'block' : 'none' }}>
                    <div className="flex items-center justify-center h-full w-full">
                        <div className={cn("p-6 bg-white rounded-lg w-full h-auto player-modal-child")}>
                            {/* Question Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">動画理解問題</h3>
                                <div className="flex items-center space-x-3">
                                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                                        質問 <span id="overlayQuestionNumber">1</span> / <span id="overlayTotalQuestions">10</span>
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200" onClick={() => setQuestionModalOpen(false)}>
                                        <FontAwesomeIcon icon={faTimes} className="fas fa-times text-xl" />
                                    </button>
                                </div>
                            </div>
                            {/* Question Content */}
                            <div className="space-y-6">
                                {/* Question Text */}
                                <div>
                                    <h4 id="overlayQuestionText" className="text-lg font-medium text-gray-900 mb-4">What is the main concept discussed in the last 3 minutes of the video?</h4>
                                </div>
                                {/* Answer Options */}
                                <div className="space-y-3">
                                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-200">
                                        <input type="radio" name="overlayQuestionAnswer" defaultValue="A" className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300" />
                                        <span className="ml-4 text-gray-900 font-medium">A) JavaScript fundamentals and basic syntax</span>
                                    </label>
                                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-200">
                                        <input type="radio" name="overlayQuestionAnswer" defaultValue="B" className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300" />
                                        <span className="ml-4 text-gray-900 font-medium">B) Advanced programming concepts and algorithms</span>
                                    </label>
                                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-200">
                                        <input type="radio" name="overlayQuestionAnswer" defaultValue="C" className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300" />
                                        <span className="ml-4 text-gray-900 font-medium">C) Database management and SQL queries</span>
                                    </label>
                                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-200">
                                        <input type="radio" name="overlayQuestionAnswer" defaultValue="D" className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300" />
                                        <span className="ml-4 text-gray-900 font-medium">D) Web development frameworks and libraries</span>
                                    </label>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div id="overlayQuestionProgress" className="bg-primary-600 h-3 rounded-full transition-all duration-300" style={{ width: '10%' }} />
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                                <div className="text-sm text-gray-500 flex items-center">
                                    <i className="fas fa-info-circle mr-2" />
                                    正しく回答して視聴を続ける
                                </div>
                                <div className="flex space-x-3">
                                    <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium">
                                        問題をスキップ
                                    </button>
                                    <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 font-medium">
                                        回答を提出
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200" onClick={() => setQuestionModalOpen(true)}>
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