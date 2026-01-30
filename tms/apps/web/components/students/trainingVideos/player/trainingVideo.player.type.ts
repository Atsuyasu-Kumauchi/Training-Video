import { IStudentTrainingVideosDto, ITrainingVideosDto } from "@/common";
import { TUiBasicModalRef } from "@/tmsui";
import { RefObject } from "react";

export interface TrainingVideoPlayerComponentProps {
    videoDetails: IStudentTrainingVideosDto;
    training: ITrainingVideosDto;
    modalRef: RefObject<TUiBasicModalRef>;
}
export type TrainingVideoPlayerViewProps = TrainingVideoPlayerComponentProps

