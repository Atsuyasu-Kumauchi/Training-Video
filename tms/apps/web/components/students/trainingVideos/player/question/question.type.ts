import { IStudentTrainingVideosTestDto, IStudentTrainingVideosTestQuestionDto } from "@/common";
import { TUiHeadLessModalRef } from "@/tmsui";
import { RefObject } from "react";


export type QuestionComponentProps = {
    questionModalRef: RefObject<TUiHeadLessModalRef>;
    test: IStudentTrainingVideosTestDto;
    submitAnswer: (questionIndex: boolean) => void;
    activeQuestion: IStudentTrainingVideosTestQuestionDto
    activeQuestionIndex: number
}

export type QuestionViewProps = QuestionComponentProps