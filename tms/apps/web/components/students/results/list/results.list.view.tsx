"use client";

import { Button } from "@/tmsui";
import { TUiBasicModalRef, UiBasicModal, uiBasicModalRefDefaultValue } from "@/tmsui/ui/UIBasicModal";
import { faCalendar, faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useRef, useState } from "react";


interface ResultDetails {
    id: number;
    title: string;
    completedDate: string;
}

export default function ResultsListView() {
    const modalRef = useRef<TUiBasicModalRef>(uiBasicModalRefDefaultValue());
    const [resultDetails, setResultDetails] = useState<ResultDetails | null>(null);
    const results = [
        {
            id: 1,
            title: "JavaScript Fundamentals",
            completedDate: "2024-01-15",
        },
        {
            id: 2,
            title: "HTML & CSS Basics",
            completedDate: "2024-01-10",
        },
    ];

    const openResultDetails = (id: number) => {
        const result = results.find((result) => result.id === id);
        if (result) {
            setResultDetails(result);
        }
        modalRef.current.modalOpen();
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">完了したトレーニング</h2>
                <p className="text-sm text-gray-500 mt-1">テスト結果とパフォーマンス詳細</p>
            </div>
            <div className="p-6">
                <div className="space-y-4" id="resultsList">
                    {results.map((result) => (
                        <Fragment key={result.id}>
                            <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <FontAwesomeIcon icon={faCheck} className="text-green-600 text-xl" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
                                    </div>
                                    <div className="flex items-center space-x-6 mt-2 text-sm text-gray-500">
                                        <span><FontAwesomeIcon icon={faCalendar} className="mr-1" />完了: {result.completedDate}</span>
                                    </div>
                                    <div className="mt-3">
                                        <Button onClick={() => openResultDetails(result.id)} variant="outline" color="neutral">
                                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                                            詳細を表示
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>

            <UiBasicModal modalRef={modalRef} title={resultDetails?.title} description="結果詳細" body={<div>結果詳細</div>} />
        </div>

    );
}
