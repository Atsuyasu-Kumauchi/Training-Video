import { IStudentTrainingVideosTestQuestionDto, TrainingVideosStatusEnum } from "@/common";
import { useVideoProgress } from "@/hooks";
import useStudentLang from "@/lang/students";
import { cn, MediaServer, UiHeadLessModal } from "@/tmsui";
import { faCheck, faCircle, faPlay, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionComponent from "../question/question.component";
import { TMediaPlayerProps } from "./mediaPlayer.type";

export default function BasicMediaPlayer({ videoDetails, modalRef, questionModalRef, training }: TMediaPlayerProps) {
    const { myTraining } = useStudentLang();
    const { videoRef, fullscreenRef, toggleFullscreen, onLoadedMetadata, activeQuestion, activeQuestionIndex, submitAnswer, modalClose, questionMessage, countdown } = useVideoProgress({
        questions: videoDetails?.test?.testQuestions,
        storageKey: `video-${videoDetails?.uploadType}-${String(videoDetails?.videoId)}`,
        dataSource: videoDetails,
        questionModalRef: questionModalRef
    });

    const statusProgress = (videoId: number) => {
        const status = training?.users[0].videoProgressMap?.[videoId];
        return status;
    };


    return (
        <div className="space-y-4">
            <div ref={fullscreenRef} className={cn("aspect-video rounded-xl overflow-hidden bg-gray-100 group player-modal relative")}>
                <video
                    ref={videoRef}
                    src={MediaServer(videoDetails?.videoUrl)}
                    onLoadedMetadata={onLoadedMetadata}
                    className="w-full h-full object-contain cursor-pointer"
                    controls
                    controlsList="nofullscreen nodownload"
                />

                <button onClick={toggleFullscreen} className="absolute bottom-9 right-16 z-50 text-gray-500 opacity-0 group-hover:opacity-100 transition-colors duration-200 fullbutton">
                    <FontAwesomeIcon icon={fas.faExpand} size="sm" />
                </button>

                <UiHeadLessModal
                    modalRef={questionModalRef}
                    body={
                        <QuestionComponent
                            questionModalRef={questionModalRef}
                            modalClose={modalClose}
                            questionMessage={questionMessage}
                            countdown={countdown}
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
                    <span
                        className={cn(
                            "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full",
                            statusProgress(videoDetails?.videoId)?.status ===
                                TrainingVideosStatusEnum.Completed
                                ? "bg-green-100 text-green-800"
                                : statusProgress(videoDetails?.videoId)?.status ===
                                    TrainingVideosStatusEnum.InProgress
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800",
                        )}
                    >
                        <FontAwesomeIcon
                            icon={
                                statusProgress(videoDetails?.videoId)?.status ===
                                    TrainingVideosStatusEnum.Completed
                                    ? faCheck
                                    : statusProgress(videoDetails?.videoId)?.status ===
                                        TrainingVideosStatusEnum.InProgress
                                        ? faPlay
                                        : faCircle
                            }
                            className="mr-1"
                        />
                        {statusProgress(videoDetails?.videoId)?.status ===
                            TrainingVideosStatusEnum.Completed
                            ? myTraining.list.completion
                            : statusProgress(videoDetails?.videoId)?.status ===
                                TrainingVideosStatusEnum.InProgress
                                ? myTraining.list.in_progress
                                : myTraining.list.not_started}
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
