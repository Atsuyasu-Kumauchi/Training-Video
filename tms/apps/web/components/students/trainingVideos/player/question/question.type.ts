import { IStudentTrainingVideosTestDto } from "@/common";
import { TUiHeadLessModalRef } from "@/tmsui";
import { RefObject } from "react";


export type QuestionComponentProps = {
    questionModalRef: RefObject<TUiHeadLessModalRef>;
    test: IStudentTrainingVideosTestDto;
}

export type QuestionViewProps = QuestionComponentProps