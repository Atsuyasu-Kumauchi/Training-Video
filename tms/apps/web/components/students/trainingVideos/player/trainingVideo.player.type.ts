import { IVideoListDto } from "@/common";
import { TUiBasicModalRef } from "@/tmsui";
import { RefObject } from "react";

export interface TrainingVideoPlayerComponentProps {
    videoDetails: IVideoListDto;
    modalRef: RefObject<TUiBasicModalRef>;
}
export type TrainingVideoPlayerViewProps = TrainingVideoPlayerComponentProps

