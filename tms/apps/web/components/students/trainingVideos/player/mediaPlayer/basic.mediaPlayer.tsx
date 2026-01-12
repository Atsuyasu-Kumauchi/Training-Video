import { cn, MediaServer, UiHeadLessModal } from "@/tmsui";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import QuestionComponent from "../question/question.component";
import { TMediaPlayerProps } from "./mediaPlayer.type";

export default function BasicMediaPlayer({ videoDetails, modalRef, questionModalRef }: TMediaPlayerProps) {

    useEffect(() => {
        setTimeout(() => {
            questionModalRef.current.modalOpen();
        }, 2000);
    }, []);

    const [isFullscreen, setIsFullscreen] = useState(false);
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
            <div ref={ref} className={cn("aspect-video bg-gray-100 group player-modal relative")}>
                <video controls className="w-full h-full" controlsList="nofullscreen">
                    <source src={MediaServer(videoDetails?.videoUrl)} type="video/mp4" />
                </video>
                <button onClick={toggleFullscreen} className="absolute bottom-9 right-16 z-50 text-gray-500 opacity-0 group-hover:opacity-100 transition-colors duration-200 fullbutton">
                    <FontAwesomeIcon icon={fas.faExpand} size="sm" />
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
                    <button onClick={() => questionModalRef.current.modalOpen()} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                        <FontAwesomeIcon icon={fas.faQuestionCircle} className="mr-2" />
                        問題を表示
                    </button>
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200" onClick={() => modalRef.current.modalClose()}>
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    )
}
