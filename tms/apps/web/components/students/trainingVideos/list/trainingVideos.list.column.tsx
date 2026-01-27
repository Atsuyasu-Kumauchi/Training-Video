"use client";
import { IStudentTrainingVideosDto, ITrainingVideosDto, ITrainingVideosStatus, TrainingVideosStatusEnum } from "@/common";
import { useStudentRightBar } from "@/hooks/useStudentRightBar";
import useStudentLang from "@/lang/students";
import { cn, MediaServer } from "@/tmsui";
import {
  TUiBasicModalRef,
  UiBasicModal,
  uiBasicModalRefDefaultValue
} from "@/tmsui/ui/UIBasicModal";
import {
  faArrowLeft,
  faBook,
  faCheck,
  faCircle,
  faClipboardCheck,
  faPlay
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import TrainingVideoPlayerComponent from "../player/trainingVideo.player.component";
import { TrainingVideosListSidebar } from "./trainingVideos.list.sidebar";



interface TrainingVideosListColumnProps {
  training: ITrainingVideosDto;
}

export default function TrainingVideosListColumn({ training }: TrainingVideosListColumnProps) {

  const { myTraining } = useStudentLang();
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  const { setSidebarContent } = useStudentRightBar();
  const [selectedVideo, setSelectedVideo] = useState<IStudentTrainingVideosDto | null>(null);

  const handlePlayVideo = useCallback((video: IStudentTrainingVideosDto) => {
    setSelectedVideo(video);
    modalRef.current.modalOpen();
  }, []);

  useEffect(() => {
    setSidebarContent(TrainingVideosListSidebar());
    return () => {
      setSidebarContent(null);
    };
  }, [setSidebarContent]);


  const startTest = useCallback((videoId: number) => {
    console.log(videoId);
  }, []);

  const statusProgress = (videoId: number) => {
    const status = training?.users[0].videoProgressMap?.[videoId];
    return status
  }

  const totalCompleteVideo = training.users[0].progress?.filter((v: ITrainingVideosStatus) => {
    const progressEntry = Object.entries(v)[0];
    return progressEntry[1].status === TrainingVideosStatusEnum.Completed;
  }).length;


  return (
    <>
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          {/* <div>
            <h1 id="trainingTitle" className="text-2xl font-bold text-gray-900">
              Project Management Basics
            </h1>
            <p id="trainingDescription" className="text-gray-600 mt-1">
              Essential project management concepts and methodologies
            </p>
          </div> */}
          <div>
            <h1 id="trainingTitle" className="text-2xl font-bold text-gray-900">
              Project Management Basics
            </h1>
            <p id="trainingDescription" className="text-gray-600 mt-1">
              Essential project management concepts and methodologies
            </p>
          </div>
          <Link
            href="/my-trainings"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-black text-sm"
            />
            {myTraining.list.return_to_training}
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div id="trainingIcon" className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faBook} className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h2 id="trainingName" className="text-lg font-medium text-gray-900">{training?.name}</h2>
                  <p id="trainingDesc" className="text-sm text-gray-500">{training?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">{myTraining.list.progress}</p>
                  <p id="progressText" className="text-lg font-bold text-blue-600">67%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">{myTraining.list.movie}</p>
                  <p id="videoCount" className="text-lg font-bold text-gray-900">{`${totalCompleteVideo}/${training.videos.length}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {myTraining.list.training_videos}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {myTraining.list.training_videos_desc}
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4" id="videoList">
              {training?.videos?.map((video) => {
                return (
                  <div key={video.videoId} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0">
                      {/* <Image
                        src={'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'}
                        alt={video.name}
                        width={96}
                        height={64}
                        className="w-24 h-16 object-cover rounded-lg"
                      /> */}
                      <img src={
                        video.uploadType === "file" ? MediaServer(video?.thumbnailUrl) : video.uploadType === "youtube" ? video?.thumbnailUrl : "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
                      } alt={video?.name} width={150} height={150} className="w-24 h-16 object-cover rounded-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {video.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {video.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button onClick={() => handlePlayVideo(video)}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faPlay} className="mr-1" />
                          {statusProgress(video.videoId)?.status === TrainingVideosStatusEnum.Completed ? myTraining.list.rewatch : statusProgress(video.videoId)?.status === TrainingVideosStatusEnum.InProgress ? '続きを見る' : '開始'}
                        </button>

                        <span className={cn("inline-flex items-center px-2 py-1 text-xs font-medium rounded-full",
                          statusProgress(video.videoId)?.status === TrainingVideosStatusEnum.Completed ? "bg-green-100 text-green-800" :
                            statusProgress(video.videoId)?.status === TrainingVideosStatusEnum.InProgress ? "bg-yellow-100 text-yellow-800" : 'bg-gray-100 text-gray-800'
                        )}
                        >
                          <FontAwesomeIcon
                            icon={statusProgress(video.videoId)?.status === TrainingVideosStatusEnum.Completed ? faCheck : statusProgress(video.videoId)?.status === TrainingVideosStatusEnum.InProgress ? faPlay : faCircle}
                            className="mr-1"
                          />
                          {
                            statusProgress(video.videoId)?.status === TrainingVideosStatusEnum.Completed ? myTraining.list.completion
                              : statusProgress(video.videoId)?.status === TrainingVideosStatusEnum.InProgress ? myTraining.list.in_progress : myTraining.list.not_started
                          }
                        </span>
                      </div>
                    </div>
                    {statusProgress(video.videoId)?.status === TrainingVideosStatusEnum.InProgress && (
                      <div className="flex-shrink-0">
                        <button onClick={() => startTest(video?.videoId)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          <FontAwesomeIcon icon={faClipboardCheck} className="mr-2" />
                          {myTraining.list.start_test}
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <UiBasicModal
              modalRef={modalRef}
              title={selectedVideo?.name ?? ""}
              body={selectedVideo ? (<TrainingVideoPlayerComponent videoDetails={selectedVideo} modalRef={modalRef} />) : null}
            />
          </div>
        </div>
      </div>
    </>
  );
}



