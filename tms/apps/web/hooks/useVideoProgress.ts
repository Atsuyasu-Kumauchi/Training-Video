import { IStudentTrainingVideosDto } from "@/common";
import { AuthServer, queryClient, TUiHeadLessModalRef } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import { useToast } from "./useToast";

export type IYTQuestion = {
    testQuestionId: number;
    question: string;
    options: string[];
    correctOption: number; // 1-based
};

type UseVideoProgressProps = {
    questions: IYTQuestion[];
    storageKey: string;
    questionModalRef: RefObject<TUiHeadLessModalRef>;
    step?: number;
    dataSource: IStudentTrainingVideosDto
};

export function useVideoProgress({ questions, storageKey, questionModalRef, step = 180, dataSource }: UseVideoProgressProps) {
    const trainingId = useParams<{ id: string }>()
    const { toastError, toastSuccess } = useToast()
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const fullscreenRef = useRef<HTMLDivElement | null>(null);

    const lastSavedTimeRef = useRef<number>(0);
    const lastQuestionIndexRef = useRef<number | null>(null);

    const [currentTime, setCurrentTime] = useState<number>(0);
    const totalDuration = useRef<number | null>(null);

    /* -------------------- Fullscreen -------------------- */
    const toggleFullscreen = (): void => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            fullscreenRef?.current?.requestFullscreen();
        }
    }

    /* 🔹 Metadata load → duration + resume */
    const onLoadedMetadata = () => {
        const video = videoRef.current;
        if (!video) return;
        totalDuration.current = Math.floor(video.duration);
        const savedTime = Number(localStorage.getItem(storageKey) || 0);
        if (savedTime) {
            video.currentTime = savedTime;
            setCurrentTime(savedTime);
            lastSavedTimeRef.current = savedTime;
        }
        setInterval(() => {
            setCurrentTime(Math.floor(video.currentTime));
        }, 1000);
    };

    const activeQuestionIndex = currentTime > 0 && currentTime % 180 === 0 && (currentTime / 180 - 1) < questions.length ? currentTime / 180 - 1 : -1;
    const activeQuestion: IYTQuestion | undefined = activeQuestionIndex >= 0 ? questions[activeQuestionIndex] : undefined;

    useEffect(() => {
        if (activeQuestionIndex === -1 || activeQuestionIndex === lastQuestionIndexRef.current) return;
        const player = videoRef.current;
        lastQuestionIndexRef.current = activeQuestionIndex;
        player?.pause();
        questionModalRef.current?.modalOpen();
    }, [activeQuestionIndex, questionModalRef]);

    const submitProgress = useMutation({
        mutationKey: ['updateVideoProgress-video', dataSource?.videoId],
        mutationFn: (data: { videoId: number, progress: { status: string, watchDuration: number } }) => {
            const response = AuthServer({
                method: 'PATCH',
                url: `/trainings/${trainingId?.id}/saveProgress`,
                data
            })
            return response
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['training-videos', trainingId?.id],
            })
        },
    })

    useEffect(() => {
        const player = videoRef.current;
        if (!player) return;
        const saved = lastSavedTimeRef.current;
        if (currentTime === saved + 1) {
            lastSavedTimeRef.current = currentTime;
            localStorage.setItem(storageKey, String(currentTime));
            return;
        }
        if (currentTime > saved + 1) {
            player.currentTime = saved;
        }
    }, [currentTime, storageKey]);


    useEffect(() => {
        const player = videoRef.current;
        if (!player) return;

        let submitted = false;

        const submitCompleted = () => {
            if (submitted) return;
            submitted = true;

            submitProgress.mutate(
                {
                    videoId: dataSource?.videoId,
                    progress: {
                        status: "COMPLETED",
                        watchDuration: Math.floor(player.duration),
                    }
                }
            );
        };

        const handleEnded = () => submitCompleted();

        const handleTimeUpdate = () => {
            if (player.currentTime >= player.duration - 1) {
                submitCompleted();
            }
        };

        player.addEventListener("ended", handleEnded);
        player.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            player.removeEventListener("ended", handleEnded);
            player.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    const submitAnswer = (isCorrect: boolean): void => {
        const player = videoRef.current;
        if (!player) return;
        if (isCorrect) {
            toastSuccess("あなたの答えは正しいです");
            submitProgress.mutate({
                videoId: dataSource?.videoId,
                progress: {
                    status: "IN_PROGRESS",
                    watchDuration: currentTime,
                }
            })
        } else {
            toastError("あなたの答えは間違っています");
            const rewindTime = Math.max(0, currentTime - (step - 1));
            player.currentTime = rewindTime;
            lastSavedTimeRef.current = rewindTime;
            localStorage.setItem(storageKey, String(rewindTime));
            player.play();
        }
        questionModalRef.current?.modalClose();
        player.play();
    };

    return {
        videoRef,
        fullscreenRef,
        onLoadedMetadata,
        currentTime,
        totalDuration,
        toggleFullscreen,
        submitAnswer,
        activeQuestion,
        activeQuestionIndex
    };
}

