import { IStudentTrainingVideosDto } from "@/common";
import { AuthServer, TUiHeadLessModalRef } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import { useToast } from "./useToast";

/* -------------------- Global Typings -------------------- */
declare global {
    interface Window {
        YT?: typeof YT;
        onYouTubeIframeAPIReady?: () => void;
    }
}

/* -------------------- YouTube API Loader -------------------- */
const loadYouTubeAPI = () =>
    new Promise<void>((resolve) => {
        if ((window as any).YT && (window as any).YT.Player) return resolve();
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        (window as any).onYouTubeIframeAPIReady = () => resolve();
    });

export type Question = {
    testQuestionId: number;
    question: string;
    options: string[];
    correctOption: number; // 1-based
};

type UseYouTubeProgressProps = {
    videoId: string;
    questions: Question[];
    storageKey: string;
    questionModalRef: RefObject<TUiHeadLessModalRef>;
    step?: number;
    dataSource?: IStudentTrainingVideosDto;
};


export function useYouTubeProgress({ videoId, questions, storageKey, questionModalRef, step = 180, dataSource }: UseYouTubeProgressProps) {
    console.log("YTdataSource", dataSource);

    const trainingId = useParams<{ id: string }>()
    const { toastError, toastSuccess } = useToast()

    const playerRef = useRef<YT.Player | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const fullscreenRef = useRef<HTMLDivElement | null>(null);

    const lastSavedTimeRef = useRef<number>(0);
    const lastQuestionIndexRef = useRef<number | null>(null);

    const [currentTime, setCurrentTime] = useState<number>(0);
    const [totalDuration, setTotalDuration] = useState<number>(0);
    const [isReady, setIsReady] = useState<boolean>(false);

    /* -------------------- Fullscreen -------------------- */
    const toggleFullscreen = (): void => {
        if (!isReady || !fullscreenRef.current) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            fullscreenRef.current.requestFullscreen();
        }
    }

    /* -------------------- Player Init -------------------- */
    useEffect(() => {
        if (!videoId) return;

        let intervalId: number | undefined;

        const init = async (): Promise<void> => {
            await loadYouTubeAPI();
            if (!containerRef.current || !window.YT) return;

            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    fs: 0,
                },
                events: {
                    onReady: (event: YT.PlayerEvent): void => {
                        const player = event.target;
                        const totalDuration = Math.floor(player.getDuration());
                        setTotalDuration(totalDuration);
                        setIsReady(true);
                        const savedTime = Number(localStorage.getItem(storageKey) || 0);

                        if (savedTime > 0) {
                            player.seekTo(savedTime, true);
                            setCurrentTime(savedTime);
                            lastSavedTimeRef.current = savedTime;

                        }

                        intervalId = window.setInterval(() => {
                            setCurrentTime(Math.floor(player.getCurrentTime()));
                        }, 1000);
                    },
                },
            });
        };

        init();

        return () => {
            if (intervalId !== undefined) clearInterval(intervalId);
            if (playerRef.current) {
                playerRef.current = null;
            }
        };
    }, [videoId, storageKey]);

    console.log("currentTime", currentTime);
    console.log("totalDuration", totalDuration);


    /* -------------------- Question Detection -------------------- */
    // const activeQuestionIndex: number = currentTime > 0 && currentTime % step === 0 ? currentTime / step - 1 : -1;
    const activeQuestionIndex = currentTime > 0 && currentTime % 180 === 0 && (currentTime / 180 - 1) < questions.length ? currentTime / 180 - 1 : -1;
    const activeQuestion: Question | undefined = activeQuestionIndex >= 0 ? questions[activeQuestionIndex] : undefined;

    useEffect(() => {
        if (!isReady || activeQuestionIndex === -1 || activeQuestionIndex === lastQuestionIndexRef.current) return;

        const player = playerRef.current;
        if (!player || typeof player.pauseVideo !== "function") return;

        lastQuestionIndexRef.current = activeQuestionIndex;
        player.pauseVideo();
        questionModalRef.current?.modalOpen();
    }, [activeQuestionIndex, isReady, questionModalRef]);

    useEffect(() => {
        if (!isReady) return;
        const saved = lastSavedTimeRef.current;
        if (currentTime === saved + 1) {
            lastSavedTimeRef.current = currentTime;
            localStorage.setItem(storageKey, String(currentTime));
            return;
        }
        if (currentTime > saved + 1) {
            const player = playerRef.current;
            if (!player || typeof player.seekTo !== "function") return;
            player.seekTo(saved, true);
        }
        // Backward seek allow 
    }, [currentTime, storageKey, isReady]);

    /* -------------------- Answer -------------------- */
    const submitProgress = useMutation({
        mutationKey: ['updateVideoProgress'],
        mutationFn: (data: { status: string }) => {
            const response = AuthServer({
                method: 'POST',
                url: '/student/training-video-progress',
                data
            })
            return response
        }
    })


    const submitAnswer = (isCorrect: boolean): void => {
        const player = playerRef.current;
        if (!player) return;

        if (isCorrect) {
            toastSuccess("Correct Answer");
            submitProgress.mutate({
                status: "IN_PROGRESS",
            })
        } else {
            toastError("Wrong Answer");
            const rewindTime = Math.max(0, currentTime - (step - 1));
            player.seekTo(rewindTime, true);
            lastSavedTimeRef.current = rewindTime;
            localStorage.setItem(storageKey, String(rewindTime));
        }
        questionModalRef.current?.modalClose();
        player.playVideo();
    };

    return {
        containerRef,
        fullscreenRef,
        currentTime,
        toggleFullscreen,
        submitAnswer,
        activeQuestion,
        activeQuestionIndex
    };
}
