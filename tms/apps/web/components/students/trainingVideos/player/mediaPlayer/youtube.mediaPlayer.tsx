import { IStudentTrainingVideosTestQuestionDto } from "@/common";
import { useYouTubeProgress } from "@/hooks";
import { cn, UiHeadLessModal } from "@/tmsui";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionComponent from "../question/question.component";
import { TMediaPlayerProps } from "./mediaPlayer.type";


export default function YoutubeMediaPlayer({ videoDetails, modalRef, questionModalRef }: TMediaPlayerProps) {

    const { containerRef, toggleFullscreen, fullscreenRef, submitAnswer, activeQuestion, activeQuestionIndex } = useYouTubeProgress({
        videoId: videoDetails?.videoUrl,
        questions: videoDetails?.test?.testQuestions,
        storageKey: `video-${videoDetails?.uploadType}-${String(videoDetails?.videoId)}`,
        questionModalRef: questionModalRef
    });

    return (
        <div className="space-y-4">
            <div ref={fullscreenRef} className={cn("aspect-video bg-gray-100 relative group player-modal")}>
                <div ref={containerRef} className="w-full h-full rounded-lg" />
                <button onClick={toggleFullscreen} className="absolute bottom-16 right-6 z-50 bg-white/70 rounded p-2 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <FontAwesomeIcon icon={fas.faExpand} size={"xl"} />
                </button>
                <UiHeadLessModal
                    modalRef={questionModalRef}
                    body={
                        <QuestionComponent
                            questionModalRef={questionModalRef}
                            test={videoDetails?.test}
                            activeQuestionIndex={activeQuestionIndex}
                            activeQuestion={activeQuestion as IStudentTrainingVideosTestQuestionDto}
                            submitAnswer={submitAnswer}
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
                    {/* <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200" onClick={() => questionModalRef.current.modalOpen()}>
                        <FontAwesomeIcon icon={fas.faQuestionCircle} className="mr-2" />
                        問題を表示
                    </button> */}
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