// import { cn } from "@/tmsui";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { QuestionViewProps } from "./question.type";

// export default function QuestionView({ questionModalRef, test }: QuestionViewProps) {
//     return (
//         <div className="bg-black/70 backdrop-blur rounded-lg shadow-2xl aspect-video absolute top-0 left-0 z-50 w-full h-full overflow-y-auto">
//             <div className="flex items-center justify-center h-full w-full">
//                 <div className={cn("p-6 bg-white rounded-lg w-full h-auto player-modal-child")}>
//                     {/* Question Header */}
//                     <div className="flex items-center justify-between mb-6">
//                         <h3 className="text-xl font-bold text-gray-900">動画理解問題</h3>
//                         <div className="flex items-center space-x-3">
//                             <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
//                                 質問 <span id="overlayQuestionNumber">1</span> / <span id="overlayTotalQuestions">10</span>
//                             </span>
//                             <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200" onClick={() => questionModalRef.current?.modalClose()}>
//                                 <FontAwesomeIcon icon={faTimes} className="fas fa-times text-xl" />
//                             </button>
//                         </div>
//                     </div>
//                     {/* Question Content */}
//                     <div className="space-y-6">
//                         {/* Question Text */}
//                         <div>
//                             <h4 id="overlayQuestionText" className="text-lg font-medium text-gray-900 mb-4">What is the main concept discussed in the last 3 minutes of the video?</h4>
//                         </div>
//                         {/* Answer Options */}
//                         <div className="space-y-3">
//                             <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-200">
//                                 <input type="radio" name="overlayQuestionAnswer" defaultValue="A" className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300" />
//                                 <span className="ml-4 text-gray-900 font-medium">A) JavaScript fundamentals and basic syntax</span>
//                             </label>
//                             <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-200">
//                                 <input type="radio" name="overlayQuestionAnswer" defaultValue="B" className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300" />
//                                 <span className="ml-4 text-gray-900 font-medium">B) Advanced programming concepts and algorithms</span>
//                             </label>
//                             <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-200">
//                                 <input type="radio" name="overlayQuestionAnswer" defaultValue="C" className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300" />
//                                 <span className="ml-4 text-gray-900 font-medium">C) Database management and SQL queries</span>
//                             </label>
//                             <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all duration-200">
//                                 <input type="radio" name="overlayQuestionAnswer" defaultValue="D" className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300" />
//                                 <span className="ml-4 text-gray-900 font-medium">D) Web development frameworks and libraries</span>
//                             </label>
//                         </div>
//                         {/* Progress Bar */}
//                         <div className="w-full bg-gray-200 rounded-full h-3">
//                             <div id="overlayQuestionProgress" className="bg-primary-600 h-3 rounded-full transition-all duration-300" style={{ width: '10%' }} />
//                         </div>
//                     </div>
//                     {/* Action Buttons */}
//                     <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
//                         <div className="text-sm text-gray-500 flex items-center">
//                             <i className="fas fa-info-circle mr-2" />
//                             正しく回答して視聴を続ける
//                         </div>
//                         <div className="flex space-x-3">
//                             <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium">
//                                 問題をスキップ
//                             </button>
//                             <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 font-medium">
//                                 回答を提出
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { cn } from "@/tmsui";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { QuestionViewProps } from "./question.type";

type TestQuestion = {
    testQuestionId: number;
    question: string;
    options: string[];
    correctOption: number; // 1-based
};

type Test = {
    name: string;
    testQuestions: TestQuestion[];
};

type Props = {
    test: Test;
    onClose: () => void;
};

export default function QuestionView({ questionModalRef, test }: QuestionViewProps) {
    const questions = test?.testQuestions ?? [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const currentQuestion = questions[currentIndex];
    const total = questions.length;

    const progressPercent = useMemo(() => {
        if (!total) return 0;
        return ((currentIndex + 1) / total) * 100;
    }, [currentIndex, total]);

    const handleSubmit = () => {
        if (selectedIndex === null) return;

        const isCorrect =
            selectedIndex === currentQuestion.correctOption - 1;

        if (!isCorrect) {
            alert("不正解です");
            return;
        }

        if (currentIndex + 1 < total) {
            setCurrentIndex((i) => i + 1);
            setSelectedIndex(null);
        } else {
            alert("全問完了");
            questionModalRef.current?.modalClose();
        }
    };

    const handleSkip = () => {
        if (currentIndex + 1 < total) {
            setCurrentIndex((i) => i + 1);
            setSelectedIndex(null);
        } else {
            questionModalRef.current?.modalClose();
        }
    };

    if (!currentQuestion) return null;

    return (
        <div className={cn("bg-black/70 rounded-lg border-3 border-gray-500 h-full w-full p-2 player-modal-child-fullscreen absolute overflow-y-auto scrollbar-none hover:scrollbar-thin top-0 left-0 z-50")}>
            <div className="bg-white rounded p-4 max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">{test.name}</h3>
                    <div className="flex items-center space-x-3">
                        <span className="bg-primary-100 px-3 py-1 rounded-full text-sm">
                            質問 {currentIndex + 1} / {total}
                        </span>
                        <button onClick={() => questionModalRef.current?.modalClose()}>
                            <FontAwesomeIcon icon={faTimes} className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Question */}
                <h4 className="text-lg font-medium mb-4">
                    {currentQuestion.question}
                </h4>

                {/* Options */}
                <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => (
                        <label
                            key={idx}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer
                ${selectedIndex === idx
                                    ? "border-primary-500 bg-primary-50"
                                    : "border-gray-200"
                                }`}
                        >
                            <input
                                type="radio"
                                name="question"
                                checked={selectedIndex === idx}
                                onChange={() => setSelectedIndex(idx)}
                                className="h-5 w-5"
                            />
                            <span className="ml-4">{option}</span>
                        </label>
                    ))}
                </div>

                {/* Progress */}
                <div className="w-full bg-gray-200 rounded-full h-3 mt-6">
                    <div
                        className="bg-primary-600 h-3 rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                    <span className="text-sm text-gray-500">
                        正しく回答して視聴を続ける
                    </span>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleSkip}
                            className="px-6 py-2 bg-gray-300 rounded-lg"
                        >
                            問題をスキップ
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={selectedIndex === null}
                            className="px-6 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50"
                        >
                            回答を提出
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
