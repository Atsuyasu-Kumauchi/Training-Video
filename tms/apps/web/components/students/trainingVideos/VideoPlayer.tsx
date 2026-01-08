'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
    videoSrc: string;
    videoId: string;
    title?: string;
}

const VideoPlayer = ({ videoSrc, videoId, title }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Unique key for localStorage
    const storageKey = `video-progress-${videoId}`;

    // Load saved progress
    useEffect(() => {
        if (!videoRef.current) return;

        const loadSavedProgress = () => {
            try {
                const savedTime = localStorage.getItem(storageKey);
                if (savedTime) {
                    const time = parseFloat(savedTime);
                    if (!isNaN(time) && videoRef.current) {
                        videoRef.current.currentTime = time;
                        setCurrentTime(time);
                    }
                }
            } catch (error) {
                console.error('Error loading saved progress:', error);
            }
        };

        loadSavedProgress();
    }, [storageKey]);

    // Setup video event listeners
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => {
            const current = video.currentTime;
            const dur = video.duration;

            setCurrentTime(current);
            setDuration(dur);

            if (dur > 0) {
                setProgress((current / dur) * 100);
            }

            // Save progress every 2 seconds
            if (Math.floor(current) % 2 === 0) {
                try {
                    localStorage.setItem(storageKey, current.toString());
                } catch (error) {
                    console.error('Error saving progress:', error);
                }
            }
        };

        const updatePlayState = () => {
            setIsPlaying(!video.paused);
        };

        const handleEnded = () => {
            try {
                localStorage.removeItem(storageKey);
            } catch (error) {
                console.error('Error removing progress:', error);
            }
            setProgress(0);
            setCurrentTime(0);
            setIsPlaying(false);
        };

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('play', updatePlayState);
        video.addEventListener('pause', updatePlayState);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('play', updatePlayState);
            video.removeEventListener('pause', updatePlayState);
            video.removeEventListener('ended', handleEnded);
        };
    }, [storageKey]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused || video.ended) {
            video.play().catch(error => {
                console.error('Error playing video:', error);
            });
        } else {
            video.pause();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const newTime = (parseFloat(e.target.value) / 100) * video.duration;
        video.currentTime = newTime;
    };

    const formatTime = (seconds: number): string => {
        if (isNaN(seconds) || seconds === Infinity) return '0:00';

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            {/* Video Title */}
            {title && (
                <div className="bg-gray-800 px-6 py-4">
                    <h2 className="text-white text-xl font-semibold">{title}</h2>
                </div>
            )}

            {/* Video Container */}
            <div className="relative bg-black">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-auto"
                    onClick={togglePlay}
                />

                {/* Play Button Overlay */}
                {!isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30"
                        onClick={togglePlay}
                    >
                        <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all">
                            <svg className="w-12 h-12 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="bg-gray-800 px-4 py-3">
                <div className="flex items-center gap-3">
                    {/* Play/Pause Button */}
                    <button
                        onClick={togglePlay}
                        className="text-white hover:text-red-500 transition-colors"
                    >
                        {isPlaying ? (
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>

                    {/* Time Display */}
                    <div className="text-white text-sm font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleSeek}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;