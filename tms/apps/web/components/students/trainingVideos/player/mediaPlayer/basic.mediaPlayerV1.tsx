

// import { cn, TUiHeadLessModalRef, UiHeadLessModal, uiHeadLessModalRefDefaultValue } from '@/tmsui';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useCallback, useEffect, useRef, useState } from 'react';

// // --- Constants ---
// const CONFIG = {
//     IDLE_TIMEOUT: 3000,
//     INTERACTION_DELAY: 10000, // Change to 180000 (3 mins) for production
// } as const;

// // --- Types ---
// type PlaybackSpeed = 0.5 | 0.75 | 1.0 | 1.25 | 1.5 | 2.0;

// // --- Component ---
// const VideoPlayerV1: React.FC = () => {
//     // --- Refs ---
//     const containerRef = useRef<HTMLDivElement>(null);
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const progressAreaRef = useRef<HTMLDivElement>(null);
//     const volumeSliderRef = useRef<HTMLInputElement>(null);

//     // Timer Refs
//     const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
//     const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

//     // --- State ---
//     const [isPlaying, setIsPlaying] = useState<boolean>(false);
//     const [currentTime, setCurrentTime] = useState<number>(0);
//     const [duration, setDuration] = useState<number>(0);
//     const [volume, setVolume] = useState<number>(1);
//     const [isMuted, setIsMuted] = useState<boolean>(false);
//     const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1.0);
//     const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
//     const [showControls, setShowControls] = useState<boolean>(true);
//     const [showModal, setShowModal] = useState<boolean>(false);
//     const [showSettings, setShowSettings] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     console.log("showControls", showControls);


//     // --- Helpers ---
//     const formatTime = (time: number): string => {
//         if (!isFinite(time)) return "00:00";
//         const m = Math.floor(time / 60);
//         const s = Math.floor(time % 60);
//         return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
//     };

//     // --- Handlers ---
//     const togglePlay = useCallback(async () => {
//         if (!videoRef.current) return;
//         if (videoRef.current.paused || videoRef.current.ended) {
//             await videoRef.current.play();
//         } else {
//             videoRef.current.pause();
//         }
//     }, []);

//     const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
//         if (!progressAreaRef.current || !videoRef.current || duration === 0) return;
//         const rect = progressAreaRef.current.getBoundingClientRect();
//         const pos = e.clientX - rect.left;
//         const percent = Math.min(100, Math.max(0, (pos / rect.width) * 100));
//         const time = (percent / 100) * duration;

//         videoRef.current.currentTime = time;
//         setCurrentTime(time);
//     }, [duration]);

//     const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         const val = parseFloat(e.target.value);
//         setVolume(val);
//         if (videoRef.current) {
//             videoRef.current.volume = val;
//             if (val > 0 && isMuted) setIsMuted(false);
//         }
//     }, [isMuted]);

//     const toggleMute = useCallback(() => {
//         setIsMuted(prev => !prev);
//         if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
//     }, []);

//     const toggleFullscreen = useCallback(() => {
//         if (!containerRef.current) return;
//         if (!document.fullscreenElement) {
//             containerRef.current.requestFullscreen().catch(console.error);
//         } else {
//             document.exitFullscreen();
//         }
//     }, []);

//     const handleSpeedChange = useCallback((speed: PlaybackSpeed) => {
//         setPlaybackSpeed(speed);
//         if (videoRef.current) videoRef.current.playbackRate = speed;
//         setShowSettings(false);
//     }, []);

//     // --- Modal Handlers ---
//     const handleModalResume = useCallback(() => {
//         setShowModal(false);
//         videoRef.current?.play();
//     }, []);

//     const handleModalStop = useCallback(() => {
//         setShowModal(false);
//         if (videoRef.current) {
//             videoRef.current.pause();
//             videoRef.current.currentTime = 0;
//         }
//         if (document.fullscreenElement) document.exitFullscreen();
//     }, []);

//     // --- Effects ---

//     // 1. Video Events & Interaction Timer
//     useEffect(() => {
//         const video = videoRef.current;
//         if (!video) return;

//         const handleTimeUpdate = () => setCurrentTime(video.currentTime);
//         const handleMetadata = () => setDuration(video.duration);
//         const handlePlay = () => setIsPlaying(true);
//         const handlePause = () => setIsPlaying(false);
//         const handleWaiting = () => setIsLoading(true);
//         const handleCanPlay = () => setIsLoading(false);

//         video.addEventListener('timeupdate', handleTimeUpdate);
//         video.addEventListener('loadedmetadata', handleMetadata);
//         video.addEventListener('play', handlePlay);
//         video.addEventListener('pause', handlePause);
//         video.addEventListener('waiting', handleWaiting);
//         video.addEventListener('canplay', handleCanPlay);

//         return () => {
//             video.removeEventListener('timeupdate', handleTimeUpdate);
//             video.removeEventListener('loadedmetadata', handleMetadata);
//             video.removeEventListener('play', handlePlay);
//             video.removeEventListener('pause', handlePause);
//             video.removeEventListener('waiting', handleWaiting);
//             video.removeEventListener('canplay', handleCanPlay);
//         };
//     }, []);

//     // 2. Interaction Timer Logic (The 3-minute popup)
//     useEffect(() => {
//         if (isPlaying && !showModal) {
//             if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);

//             interactionTimerRef.current = setTimeout(() => {
//                 videoRef.current?.pause();
//                 setShowModal(true);
//             }, CONFIG.INTERACTION_DELAY);
//         }
//         return () => {
//             if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
//         };
//     }, [isPlaying, showModal]);

//     // 3. Idle Mouse Logic
//     useEffect(() => {
//         const resetIdle = () => {
//             setShowControls(true);
//             setShowSettings(false); // Hide settings on interaction
//             if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

//             if (isPlaying) {
//                 idleTimerRef.current = setTimeout(() => {
//                     setShowControls(false);
//                 }, CONFIG.IDLE_TIMEOUT);
//             }
//         };

//         const container = containerRef.current;
//         if (container) {
//             container.addEventListener('mousemove', resetIdle);
//             container.addEventListener('click', resetIdle);
//         }
//         return () => {
//             if (container) {
//                 container.removeEventListener('mousemove', resetIdle);
//                 container.removeEventListener('click', resetIdle);
//             }
//             if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
//         };
//     }, [isPlaying]);

//     // 4. Keyboard Shortcuts
//     useEffect(() => {
//         const handleKey = (e: KeyboardEvent) => {
//             const key = e.key.toLowerCase();
//             if (key === ' ' || key === 'k') {
//                 e.preventDefault();
//                 togglePlay();
//             } else if (key === 'arrowleft') {
//                 if (videoRef.current) videoRef.current.currentTime -= 5;
//             } else if (key === 'arrowright') {
//                 if (videoRef.current) videoRef.current.currentTime += 5;
//             } else if (key === 'm') {
//                 toggleMute();
//             } else if (key === 'f') {
//                 toggleFullscreen();
//             }
//         };

//         window.addEventListener('keydown', handleKey);
//         return () => window.removeEventListener('keydown', handleKey);
//     }, [togglePlay, toggleMute, toggleFullscreen]);

//     // 5. Sync Muted State & Fullscreen State
//     useEffect(() => {
//         if (videoRef.current) videoRef.current.muted = isMuted;
//     }, [isMuted]);

//     useEffect(() => {
//         const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
//         document.addEventListener('fullscreenchange', handleFullscreenChange);
//         return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     }, []);


//     const questionModalRef = useRef<TUiHeadLessModalRef>(uiHeadLessModalRefDefaultValue());

//     useEffect(() => {
//         if (showModal) {
//             questionModalRef.current.modalOpen();
//         }
//     }, [showModal]);

//     return (
//         <div className="w-full max-w-5xl mx-auto my-10">
//             <div ref={containerRef} className="relative group bg-black rounded-xl overflow-hidden aspect-video shadow-2xl">
//                 {/* Video Element */}
//                 <video
//                     ref={videoRef}
//                     src="http://10.11.106.33:7001/static/0b530d87-09f6-407a-9953-7a5f194c1c1b.mp4"
//                     poster="https://picsum.photos/seed/videoPoster/900/506.jpg"
//                     className="w-full h-full object-contain cursor-pointer"
//                     onClick={togglePlay}
//                 />

//                 {/* Big Play Button */}
//                 {!isPlaying && (
//                     <button onClick={togglePlay} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/60 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform z-20">
//                         <FontAwesomeIcon icon={fas.faPlay} className="text-3xl ml-1" />
//                     </button>
//                 )}

//                 {/* Loader */}
//                 {isLoading && (
//                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white/10 border-t-red-600 rounded-full w-12 h-12 animate-spin z-30"></div>
//                 )}

//                 {/* Interaction Modal */}
//                 {showModal && (<>
//                     <UiHeadLessModal
//                         modalRef={questionModalRef}
//                         body={
//                             <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center animate-in fade-in duration-300">
//                                 <div className="bg-gray-900 p-8 rounded-lg text-center max-w-sm border border-gray-700 shadow-2xl">
//                                     <h3 className="text-2xl font-bold text-white mb-2">Are you still watching?</h3>
//                                     <p className="text-gray-400 mb-6">Click continue to resume playback.</p>
//                                     <div className="flex gap-4 justify-center">
//                                         <button onClick={handleModalResume} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-medium transition">
//                                             Yes, Continue
//                                         </button>
//                                         <button onClick={handleModalStop} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium transition">
//                                             No, Stop
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         }
//                     />

//                 </>)}

//                 {/* Controls Wrapper */}
//                 <div className={cn(
//                     'absolute bottom-0 left-0 w-full p-4 z-40 transition-opacity duration-300 bg-gradient-to-t from-black/95 via-black/50 to-transparent',
//                     showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
//                 )}>
//                     {/* Progress Bar */}
//                     <div
//                         ref={progressAreaRef}
//                         className="relative w-full h-1.5 bg-white/30 rounded-full cursor-pointer mb-4 group/progress hover:h-2.5 transition-all"
//                         onClick={handleSeek}
//                     >
//                         <div
//                             className="h-full bg-red-600 rounded-full relative group-hover/progress:bg-red-500"
//                             style={{ width: `${(currentTime / duration) * 100}%` }}
//                         >
//                             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
//                         </div>
//                     </div>

//                     {/* Controls Row */}
//                     <div className="flex items-center justify-between text-white">
//                         <div className="flex items-center gap-4">
//                             <button onClick={togglePlay} className="hover:text-red-500 transition">
//                                 <FontAwesomeIcon icon={isPlaying ? fas.faPause : fas.faPlay} className="text-xl" />
//                             </button>
//                             <button onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)} className="hover:text-red-500 transition">
//                                 <FontAwesomeIcon icon={fas.faRotateLeft} className="text-lg" />
//                             </button>
//                             <button onClick={() => videoRef.current && (videoRef.current.currentTime += 10)} className="hover:text-red-500 transition">
//                                 <FontAwesomeIcon icon={fas.faRotateRight} className="text-lg" />
//                             </button>

//                             <div className="flex items-center group/vol">
//                                 <button onClick={toggleMute} className="hover:text-red-500 transition">
//                                     <FontAwesomeIcon icon={isMuted || volume === 0 ? fas.faVolumeMute : fas.faVolumeHigh} className="text-lg" />
//                                 </button>
//                                 <div className="flex w-0 opacity-0 group-hover/vol:w-24 group-hover/vol:opacity-100 transition-all duration-300 pl-0 group-hover/vol:pl-2">
//                                     <input
//                                         ref={volumeSliderRef}
//                                         type="range"
//                                         min="0"
//                                         max="1"
//                                         step="0.05"
//                                         value={volume}
//                                         onChange={handleVolumeChange}
//                                         className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-red-600"
//                                     />
//                                 </div>
//                             </div>


//                             <div className="text-sm font-medium tracking-wide">
//                                 <span>{formatTime(currentTime)}</span> / <span className="text-gray-400">{formatTime(duration)}</span>
//                             </div>
//                         </div>

//                         {/* Right Controls */}
//                         <div className="flex items-center gap-4">
//                             {/* Settings */}
//                             {/* <div className="relative">
//                                 <button onClick={() => setShowSettings(!showSettings)} className="hover:text-red-500 transition">
//                                     <FontAwesomeIcon icon={fas.faGear} className="text-lg" />
//                                 </button>
//                                 {showSettings && (
//                                     <div className="absolute bottom-10 right-0 bg-black/90 backdrop-blur-sm rounded-md overflow-hidden min-w-[140px] shadow-lg border border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
//                                         {([0.5, 0.75, 1.0, 1.25, 1.5, 2.0] as const).map(speed => (
//                                             <div
//                                                 key={speed}
//                                                 onClick={() => handleSpeedChange(speed)}
//                                                 className={`px-4 py-2 text-sm hover:bg-white/10 cursor-pointer flex justify-between ${playbackSpeed === speed ? 'text-red-500 font-bold' : 'text-gray-300'}`}
//                                             >
//                                                 <span>{speed}x</span>
//                                                 {playbackSpeed === speed && <i className="fas fa-check text-xs mt-1"></i>}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div> */}

//                             {/* Fullscreen */}
//                             <button onClick={toggleFullscreen} className="hover:text-red-500 transition">
//                                 <FontAwesomeIcon icon={isFullscreen ? fas.faCompress : fas.faExpand} className="text-xl" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Instructions */}
//             {/* <div className="mt-4 text-center text-gray-500 text-xs">
//                 Shortcuts: <kbd className="bg-gray-800 px-1 rounded text-gray-300">Space</kbd> Play/Pause &bull;
//                 <kbd className="bg-gray-800 px-1 rounded text-gray-300">←</kbd> <kbd className="bg-gray-800 px-1 rounded text-gray-300">→</kbd> Rewind/Fwd &bull;
//                 <kbd className="bg-gray-800 px-1 rounded text-gray-300">M</kbd> Mute &bull;
//                 <kbd className="bg-gray-800 px-1 rounded text-gray-300">F</kbd> Fullscreen
//             </div> */}
//         </div>
//     );
// };

// export default VideoPlayerV1;
