"use client";
import { useStudentRightBar } from "@/hooks/useStudentRightBar";
import { cn } from "@/tmsui";
import { TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from "@/tmsui/ui/UIBasicModal";
import { faBook, faCheck, faClipboardCheck, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const videoList = [
    {
        id: 1,
        title: 'Introduction to JavaScript',
        description: 'Learn the basics of JavaScript programming',
        duration: '15:30',
        status: 'Completed',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 2,
        title: 'Variables and Data Types',
        description: 'Understanding variables, strings, numbers, and booleans',
        duration: '22:15',
        status: 'Completed',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 3,
        title: 'Functions and Scope',
        description: 'Creating and using functions in JavaScript',
        duration: '28:45',
        status: 'Completed',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 4,
        title: 'Control Structures',
        description: 'If statements, loops, and conditional logic',
        duration: '25:10',
        status: 'Completed',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 5,
        title: 'Arrays and Objects',
        description: 'Working with arrays and object literals',
        duration: '32:20',
        status: 'Completed',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 6,
        title: 'DOM Manipulation',
        description: 'Interacting with HTML elements using JavaScript',
        duration: '35:15',
        status: 'Completed',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 7,
        title: 'Event Handling',
        description: 'Responding to user interactions and events',
        duration: '20:30',
        status: 'Completed',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 8,
        title: 'Asynchronous JavaScript',
        description: 'Callbacks, promises, and async/await',
        duration: '40:25',
        status: 'Completed',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 9,
        title: 'Error Handling',
        description: 'Try-catch blocks and error management',
        duration: '18:45',
        status: 'In Progress',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 10,
        title: 'ES6 Features',
        description: 'Modern JavaScript features and syntax',
        duration: '45:10',
        status: 'In Progress',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 11,
        title: 'Modules and Imports',
        description: 'Organizing code with modules',
        duration: '22:30',
        status: 'Not Started',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
        id: 12,
        title: 'Final Project',
        description: 'Build a complete JavaScript application',
        duration: '60:00',
        status: 'Not Started',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
]

interface VideoDetails {
    title: string;
    description: string;
    duration: string;
    status: string;
    thumbnail: string;
    videoUrl: string;
}

export default function TrainingVideosPage() {

    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    const { setSidebarContent } = useStudentRightBar();
    const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
    useEffect(() => {
        setSidebarContent(videoListRightSidebar());
        return () => {
            setSidebarContent(null);
        }
    }, [setSidebarContent]);

    const openVideoDetails = (videoId: number) => {
        modalRef.current.modalOpen();
        const video = videoList.find(video => video.id === videoId);
        if (video) {
            setVideoDetails(video);

        }
    }
    const watchVideo = (videoId: number) => {
        console.log(`Watching video: ${videoId}`);
    }
    const startTest = () => {
        console.log(`Starting test`);
    }

    console.log("videoDetails", videoDetails);
    return (
        <>
            <UiBasicModal modalRef={modalRef} title={videoDetails?.title} description={videoDetails?.description} body={<div>動画詳細</div>} />

            <div className="px-6 py-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 id="trainingTitle" className="text-2xl font-bold text-gray-900">JavaScript Fundamentals</h1>
                        <p id="trainingDescription" className="text-gray-600 mt-1">Learn the basics of JavaScript programming language</p>
                    </div>
                    <a href="my-trainings.html" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200">
                        <i className="fas fa-arrow-left mr-2" />
                        トレーニング一覧に戻る
                    </a>
                </div>
                {/* Training Info Card */}
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
                                    <h2 id="trainingName" className="text-lg font-medium text-gray-900">JavaScript Fundamentals</h2>
                                    <p id="trainingDesc" className="text-sm text-gray-500">Learn the basics of JavaScript programming language</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-500">進捗</p>
                                    <p id="progressText" className="text-lg font-bold text-blue-600">67%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-500">動画</p>
                                    <p id="videoCount" className="text-lg font-bold text-gray-900">8/12</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">トレーニング動画</h2>
                        <p className="text-sm text-gray-500 mt-1">すべての動画を完了してこのトレーニングを終了</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4" id="videoList">

                            {videoList.map((video) => (
                                <div key={video.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex-shrink-0">
                                        <Image src={video.thumbnail} alt={video.title}
                                            width={96}
                                            height={64}
                                            className="w-24 h-16 object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">{video.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <button onClick={() => openVideoDetails(video.id)} className="inline-flex items-center px-3 py-1 text-xs font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200">
                                                <FontAwesomeIcon icon={faPlay} className="mr-1" />
                                                再視聴
                                            </button>
                                            <span className={cn("inline-flex items-center px-2 py-1 text-xs font-medium rounded-full", video.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800")}>
                                                <FontAwesomeIcon icon={video.status === "Completed" ? faCheck : faPlay} className="mr-1" />
                                                {video.status === "Completed" ? "完了" : "進行中"}
                                            </span>
                                        </div>
                                    </div>
                                    {video.status === "In Progress" && (
                                        <div className="flex-shrink-0">
                                            <button onClick={() => watchVideo(video.id)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                                                <FontAwesomeIcon icon={faClipboardCheck} className="mr-2" />
                                                テストを開始
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

export const videoListRightSidebar = () => {
    return (
        <>
            <div className="px-4 py-4.5 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <i className="fas fa-clipboard-list mr-2 text-primary-600" />
                    課題レビュー
                    <span id="assignmentCount" className="ml-2 bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">3</span>
                </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Assignment Item 1 */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-xs">JD</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">John Doe</p>
                                <p className="text-xs text-gray-500">john.doe@example.com</p>
                            </div>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                            保留中
                        </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">Explain the concept of closures in JavaScript with examples</p>
                </div>
                {/* Assignment Item 2 */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-xs">SW</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Sarah Wilson</p>
                                <p className="text-xs text-gray-500">sarah.wilson@example.com</p>
                            </div>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                            保留中
                        </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">Describe the difference between functional and class components</p>
                </div>
                {/* Assignment Item 3 */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-xs">MJ</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Mike Johnson</p>
                                <p className="text-xs text-gray-500">mike.johnson@example.com</p>
                            </div>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                            保留中
                        </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">What are the key qualities of an effective leader?</p>
                </div>
            </div>
        </>
    )
}