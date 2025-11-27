'use client';

import VideoPlayer from "@/components/VideoPlayer";


export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Video Player Test
                </h1>

                <div className="space-y-8">
                    <VideoPlayer
                        videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        videoId="test-video-1"
                        title="Test Video 1"
                    />
                </div>
            </div>
        </div>
    );
}