"use client";

import { IMyTrainingsDto, TrainingVideosStatusEnum } from "@/common";
import useStudentLang from "@/lang/students";
import { cn, formateDate } from "@/tmsui";
import { faBook, faCheck, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getOverallStatus } from "./myTraining.list.type";

type MyTrainingListViewProps = {
  trainingsData: IMyTrainingsDto[];
};

export default function MyTrainingListView({
  trainingsData,
}: MyTrainingListViewProps) {
  const { myTraining } = useStudentLang();
  return (
    <div className="p-6">
      <div className="space-y-4">
        {trainingsData?.length === 0 && (
          <div className="flex items-center justify-center h-[500px]">
            <p className="text-gray-600">{myTraining.list.data_not_found}</p>
          </div>
        )}
        {trainingsData?.map((training) => {
          return (
            <Link href={"/student/training-videos/" + training.trainingId} key={training.trainingId} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getOverallStatus(training.users) === TrainingVideosStatusEnum.Completed ? "bg-green-100" : "bg-blue-100"}`} >
                <FontAwesomeIcon
                  icon={
                    getOverallStatus(training.users) === TrainingVideosStatusEnum.Completed ? faCheck :
                      getOverallStatus(training.users) === TrainingVideosStatusEnum.InProgress ? faBook : faBook}
                  className={`${getOverallStatus(training.users) === TrainingVideosStatusEnum.Completed ? "text-green-600" : "text-blue-600"} text-lg`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{training.name}</h3>
                  <span className={
                    cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium",
                      getOverallStatus(training.users) === TrainingVideosStatusEnum.Completed ? "bg-green-100 text-green-800" :
                        getOverallStatus(training.users) === TrainingVideosStatusEnum.InProgress ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                    )}>
                    {getOverallStatus(training.users) === TrainingVideosStatusEnum.Completed ? (
                      <> {myTraining.list.completion}</>
                    ) : getOverallStatus(training.users) === TrainingVideosStatusEnum.InProgress ? (
                      <> {myTraining.list.in_progress}</>
                    ) : (
                      <> {myTraining.list.not_started}</>
                    )}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1">{training.description}</p>

                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                  <span>
                    <FontAwesomeIcon icon={faVideo} className="mr-1" />
                    {`${training?.videos?.length}/${training?.videos?.length}`} {" "} {myTraining.list.video}
                  </span>
                  <span>
                    {getOverallStatus(training.users) === TrainingVideosStatusEnum.Completed ? `${myTraining.list.completed}: ${formateDate(training.modified)}` : `${myTraining.list.deadline}: ${formateDate(training.deadline)}`}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
