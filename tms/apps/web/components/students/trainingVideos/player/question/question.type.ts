import { IStudentTrainingVideosTestDto, IStudentTrainingVideosTestQuestionDto } from "@/common";
import { TUiHeadLessModalRef } from "@/tmsui";
import { RefObject } from "react";


export type QuestionComponentProps = {
    questionModalRef?: RefObject<TUiHeadLessModalRef>;
    modalClose: () => void;
    questionMessage?: { correct: boolean | null, type: string, message: string };
    countdown?: number | null;
    test: IStudentTrainingVideosTestDto;
    submitAnswer: (questionIndex: boolean) => void;
    activeQuestion: IStudentTrainingVideosTestQuestionDto
    activeQuestionIndex: number
}

export type QuestionViewProps = QuestionComponentProps