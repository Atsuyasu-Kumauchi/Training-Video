import { ITrainingsUserDto, TrainingVideosStatusEnum } from "@/common";

export const getOverallStatus = (users: ITrainingsUserDto[]) => {
    const progress = (users[0].progress) ?? [];
    const statuses = progress.map(p => Object.values(p)[0].status);
    if (statuses.some(s => s === TrainingVideosStatusEnum.InProgress)) return TrainingVideosStatusEnum.InProgress;
    if (statuses.some(s => s === TrainingVideosStatusEnum.Completed)) return TrainingVideosStatusEnum.Completed;
    return TrainingVideosStatusEnum.NotStarted;
};