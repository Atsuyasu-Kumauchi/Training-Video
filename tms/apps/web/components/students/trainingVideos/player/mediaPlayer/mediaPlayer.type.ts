import { IStudentTrainingVideosDto, ITrainingVideosDto } from "@/common";
import { TUiBasicModalRef, TUiHeadLessModalRef } from "@/tmsui";
import { RefObject } from "react";

export interface TMediaPlayerProps {
    videoDetails: IStudentTrainingVideosDto;
    training: ITrainingVideosDto;
    modalRef: RefObject<TUiBasicModalRef>;
    questionModalRef: RefObject<TUiHeadLessModalRef>;
}