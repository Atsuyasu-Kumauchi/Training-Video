"use client";

import { IMyTrainingsDto } from "@/common";
import useStudentLang from "@/lang/students";
import { cn, formateDate } from "@/tmsui";
import { faBook, faCheck, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type MyTrainingListViewProps = {
  trainingsData: IMyTrainingsDto[];
}

export default function MyTrainingListView({ trainingsData }: MyTrainingListViewProps) {
  const { myTraining } = useStudentLang();


  // const router = useRouter();

  // const sortedTrainings = [
  //   ...trainings.filter((t) => t.status !== "Completed"),
  //   ...trainings.filter((t) => t.status === "Completed"),
  // ];

  // const openVideos = (id: number, title: string) => {
  //   router.push(
  //     `/student/training-videos/?training=${id}&title=${encodeURIComponent(
  //       title
  //     )}`
  //   );
  // };

  return (
    <div className="p-6">
      <div className="space-y-4">
        {trainingsData?.map((training) => (
          <Link href={"/student/training-videos/" + training.trainingId} key={training.trainingId} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${training.status === true ? "bg-green-100" : "bg-blue-100"}`} >
              <FontAwesomeIcon
                icon={training.status === true ? faCheck : faBook}
                className={`${training.status === true
                  ? "text-green-600"
                  : "text-blue-600"
                  } text-lg`}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{training.name}</h3>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-medium",
                  training.status === true ? "bg-green-100 text-green-800" : training.status === false ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
                )}>
                  {training.status === true ? (
                    <> {myTraining.list.completion}</>
                  ) : training.status === false ? (
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
                  {training.status === true
                    ? `${myTraining.list.completed}: ${formateDate(training.modified)}`
                    : `${myTraining.list.deadline}: ${formateDate(training.deadline)}`}
                </span>
              </div>
            </div>
          </Link>
        ))}
        {/* {sortedTrainings.map((t) => (
          <div
            key={t.id}
            className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => openVideos(t.id, t.title)}
          >
            <div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${t.status === "Completed" ? "bg-green-100" : "bg-blue-100"
                  }`}
              >
                <FontAwesomeIcon
                  icon={t.status === "Completed" ? faCheck : faBook}
                  className={`${t.status === "Completed"
                    ? "text-green-600"
                    : "text-blue-600"
                    } text-lg`}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{t.title}</h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${t.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : t.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {t.status === "Completed" ? (
                    <> {myTraining.list.completion}</>
                  ) : t.status === "In Progress" ? (
                    <> {myTraining.list.in_progress}</>
                  ) : (
                    <> {myTraining.list.not_started}</>
                  )}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1">{t.description}</p>

              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                <span>
                  <FontAwesomeIcon icon={faVideo} className="mr-1" />
                  {t.completedVideos}/{t.totalVideos} {myTraining.list.video}
                </span>

                <span>
                  {t.status === "Completed"
                    ? `${myTraining.list.completed}: ${t.completedDate}`
                    : `${myTraining.list.deadline}: ${t.dueDate}`}
                </span>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>


    // <div className="p-6">
    //   <div className="space-y-4">
    //     {sortedTrainings.map((t) => (
    //       <div
    //         key={t.id}
    //         className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
    //         onClick={() => openVideos(t.id, t.title)}
    //       >
    //         <div>
    //           <div
    //             className={`w-10 h-10 rounded-full flex items-center justify-center ${t.status === "Completed" ? "bg-green-100" : "bg-blue-100"
    //               }`}
    //           >
    //             <FontAwesomeIcon
    //               icon={t.status === "Completed" ? faCheck : faBook}
    //               className={`${t.status === "Completed"
    //                 ? "text-green-600"
    //                 : "text-blue-600"
    //                 } text-lg`}
    //             />
    //           </div>
    //         </div>

    //         <div className="flex-1">
    //           <div className="flex items-center justify-between">
    //             <h3 className="font-medium">{t.title}</h3>
    //             <span
    //               className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${t.status === "Completed"
    //                 ? "bg-green-100 text-green-800"
    //                 : t.status === "In Progress"
    //                   ? "bg-yellow-100 text-yellow-800"
    //                   : "bg-gray-100 text-gray-800"
    //                 }`}
    //             >
    //               {t.status === "Completed" ? (
    //                 <> {myTraining.list.completion}</>
    //               ) : t.status === "In Progress" ? (
    //                 <> {myTraining.list.in_progress}</>
    //               ) : (
    //                 <> {myTraining.list.not_started}</>
    //               )}
    //             </span>
    //           </div>

    //           <p className="text-sm text-gray-600 mt-1">{t.description}</p>

    //           <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
    //             <span>
    //               <FontAwesomeIcon icon={faVideo} className="mr-1" />
    //               {t.completedVideos}/{t.totalVideos} {myTraining.list.video}
    //             </span>

    //             <span>
    //               {t.status === "Completed"
    //                 ? `${myTraining.list.completed}: ${t.completedDate}`
    //                 : `${myTraining.list.deadline}: ${t.dueDate}`}
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
