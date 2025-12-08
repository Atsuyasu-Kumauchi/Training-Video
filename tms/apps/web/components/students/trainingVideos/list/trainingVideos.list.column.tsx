"use client";
import { useStudentRightBar } from "@/hooks/useStudentRightBar";
import useStudentLang from "@/lang/students";
import { cn } from "@/tmsui";
import {
  TUiBasicModalRef,
  UiBasicModal,
  uiBasicModalRefDefaultValue,
} from "@/tmsui/ui/UIBasicModal";
import {
  faArrowLeft,
  faBook,
  faCheck,
  faClipboardCheck,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TrainingVideosListSidebar } from "./trainingVideos.list.sidebar";

const videoList = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript programming",
    duration: "15:30",
    status: "Completed",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Variables and Data Types",
    description: "Understanding variables, strings, numbers, and booleans",
    duration: "22:15",
    status: "Completed",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Functions and Scope",
    description: "Creating and using functions in JavaScript",
    duration: "28:45",
    status: "Completed",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Control Structures",
    description: "If statements, loops, and conditional logic",
    duration: "25:10",
    status: "Completed",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Arrays and Objects",
    description: "Working with arrays and object literals",
    duration: "32:20",
    status: "Completed",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "DOM Manipulation",
    description: "Interacting with HTML elements using JavaScript",
    duration: "35:15",
    status: "Completed",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 7,
    title: "Event Handling",
    description: "Responding to user interactions and events",
    duration: "20:30",
    status: "Completed",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 8,
    title: "Asynchronous JavaScript",
    description: "Callbacks, promises, and async/await",
    duration: "40:25",
    status: "Completed",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 9,
    title: "Error Handling",
    description: "Try-catch blocks and error management",
    duration: "18:45",
    status: "In Progress",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 10,
    title: "ES6 Features",
    description: "Modern JavaScript features and syntax",
    duration: "45:10",
    status: "In Progress",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 11,
    title: "Modules and Imports",
    description: "Organizing code with modules",
    duration: "22:30",
    status: "Not Started",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 12,
    title: "Final Project",
    description: "Build a complete JavaScript application",
    duration: "60:00",
    status: "Not Started",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

interface VideoDetails {
  title: string;
  description: string;
  duration: string;
  status: string;
  thumbnail: string;
  videoUrl: string;
}

export default function TrainingVideosListColumn() {
  const { myTraining } = useStudentLang();
  const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
  const { setSidebarContent } = useStudentRightBar();
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  useEffect(() => {
    setSidebarContent(TrainingVideosListSidebar());
    return () => {
      setSidebarContent(null);
    };
  }, [setSidebarContent]);

  const openVideoDetails = (videoId: number) => {
    modalRef.current.modalOpen();
    const video = videoList.find((video) => video.id === videoId);
    if (video) {
      setVideoDetails(video);
    }
  };
  const watchVideo = (videoId: number) => {
    console.log(`Watching video: ${videoId}`);
  };
  const startTest = () => {
    console.log(`Starting test`);
  };

  console.log("videoDetails", videoDetails);
  return (
    <>
      <UiBasicModal
        modalRef={modalRef}
        title={videoDetails?.title}
        description={videoDetails?.description}
        body={<div>動画詳細</div>}
      />

      <div className="px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 id="trainingTitle" className="text-2xl font-bold text-gray-900">
              Project Management Basics
            </h1>
            <p id="trainingDescription" className="text-gray-600 mt-1">
              Essential project management concepts and methodologies
            </p>
          </div>
          {/* <a
            href="my-trainings.html"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2" />
            {myTraining.list.return_to_training}
          </a> */}
          <Link
            href="/student/my-trainings"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-black text-sm"
            />
            {myTraining.list.return_to_training}
          </Link>
        </div>
        {/* Training Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div
                    id="trainingIcon"
                    className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faBook}
                      className="text-blue-600 text-xl"
                    />
                  </div>
                </div>
                <div>
                  <h2
                    id="trainingName"
                    className="text-lg font-medium text-gray-900"
                  >
                    JavaScript Fundamentals
                  </h2>
                  <p id="trainingDesc" className="text-sm text-gray-500">
                    Learn the basics of JavaScript programming language
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">
                    {myTraining.list.progress}
                  </p>
                  <p
                    id="progressText"
                    className="text-lg font-bold text-blue-600"
                  >
                    67%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">
                    {myTraining.list.movie}
                  </p>
                  <p
                    id="videoCount"
                    className="text-lg font-bold text-gray-900"
                  >
                    8/12
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {" "}
              {myTraining.list.training_videos}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {myTraining.list.training_videos_desc}
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4" id="videoList">
              {videoList.map((video) => (
                <div
                  key={video.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={96}
                      height={64}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        {video.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {video.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => openVideoDetails(video.id)}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faPlay} className="mr-1" />
                        {myTraining.list.rewatch}
                      </button>
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full",
                          video.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        )}
                      >
                        <FontAwesomeIcon
                          icon={video.status === "Completed" ? faCheck : faPlay}
                          className="mr-1"
                        />
                        {video.status === "Completed" ? (
                          <> {myTraining.list.completion}</>
                        ) : (
                          <> {myTraining.list.in_progress}</>
                        )}
                      </span>
                    </div>
                  </div>
                  {video.status === "In Progress" && (
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => watchVideo(video.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        <FontAwesomeIcon
                          icon={faClipboardCheck}
                          className="mr-2"
                        />
                        {myTraining.list.start_test}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
