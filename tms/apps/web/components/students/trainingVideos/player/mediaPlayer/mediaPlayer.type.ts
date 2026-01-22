import { IStudentTrainingVideosDto } from "@/common";
import { TUiBasicModalRef, TUiHeadLessModalRef } from "@/tmsui";
import { RefObject } from "react";

export interface TMediaPlayerProps {
    videoDetails: IStudentTrainingVideosDto;
    modalRef: RefObject<TUiBasicModalRef>;
    questionModalRef: RefObject<TUiHeadLessModalRef>;
}