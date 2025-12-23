import useStudentLang from "@/lang/students";

function ResultsListDetails() {
  const { result } = useStudentLang();
  return (
    <div className="border-t pt-6 border-gray-300">
      <h4 className="text-lg font-medium text-gray-900 mb-4">
        {" "}
        {result.list.question_details}
      </h4>
      <div className="space-y-4">
        {completedResults.map((results) => (
          <>
            {results.questions.map((question, index) => (
              <>
                <div
                  className={`
                    border border-gray-200 rounded-lg p-4 
                    ${question.isCorrect ? "bg-green-50" : "bg-red-50"}
                    `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-medium text-gray-900">
                      {result.list.question} {index + 1}
                    </h5>
                    <span
                      className={`
                                inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                ${
                                  question.isCorrect
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                            `}
                    >
                      {question.isCorrect
                        ? `${result.list.correct_answer}`
                        : `${result.list.Incorrect}`}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{question.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">
                        {result.list.response}:
                      </span>
                      <p className="text-gray-700 mt-1">
                        {question.userAnswer}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {" "}
                        {result.list.correct_answer}:
                      </span>
                      <p className="text-gray-700 mt-1">
                        {question.correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

export default ResultsListDetails;

const completedResults = [
  {
    id: 1,
    trainingTitle: "JavaScript Fundamentals",
    completedDate: "2024-01-15",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeTaken: "45:30",
    status: "Passed",
    questions: [
      {
        id: 1,
        question: "What is JavaScript?",
        userAnswer: "A programming language for web development",
        correctAnswer: "A programming language for web development",
        isCorrect: true,
        explanation:
          "JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web.",
      },
      {
        id: 2,
        question: "Which keyword is used to declare a variable in JavaScript?",
        userAnswer: "var",
        correctAnswer: "let, const, or var",
        isCorrect: false,
        explanation:
          "JavaScript supports multiple ways to declare variables: var (function-scoped), let (block-scoped), and const (block-scoped, read-only).",
      },
      {
        id: 3,
        question: 'What is the result of 2 + "2" in JavaScript?',
        userAnswer: "22",
        correctAnswer: "22",
        isCorrect: true,
        explanation:
          "JavaScript performs type coercion. When adding a number and a string, the number is converted to a string and concatenated.",
      },
      {
        id: 4,
        question:
          "Which method is used to add an element to the end of an array?",
        userAnswer: "push()",
        correctAnswer: "push()",
        isCorrect: true,
        explanation:
          "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
      },
      {
        id: 5,
        question: 'What is the purpose of the "use strict" directive?',
        userAnswer: "To enable strict mode for better error checking",
        correctAnswer: "To enable strict mode for better error checking",
        isCorrect: true,
        explanation:
          'The "use strict" directive enables strict mode, which helps catch common coding mistakes and prevents certain unsafe actions.',
      },
    ],
  },
  {
    id: 2,
    trainingTitle: "HTML & CSS Basics",
    completedDate: "2024-01-10",
    score: 92,
    totalQuestions: 15,
    correctAnswers: 14,
    timeTaken: "32:15",
    status: "Passed",
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        userAnswer: "HyperText Markup Language",
        correctAnswer: "HyperText Markup Language",
        isCorrect: true,
        explanation:
          "HTML (HyperText Markup Language) is the standard markup language for creating web pages.",
      },
      {
        id: 2,
        question: "Which HTML tag is used to create a hyperlink?",
        userAnswer: "<a>",
        correctAnswer: "<a>",
        isCorrect: true,
        explanation:
          "The <a> tag defines a hyperlink, which is used to link from one page to another.",
      },
      {
        id: 3,
        question: "What is the purpose of CSS?",
        userAnswer: "To style and layout web pages",
        correctAnswer: "To style and layout web pages",
        isCorrect: true,
        explanation:
          "CSS (Cascading Style Sheets) is used to style and layout web pages, controlling colors, fonts, spacing, and more.",
      },
      {
        id: 4,
        question: "Which CSS property controls the text color?",
        userAnswer: "color",
        correctAnswer: "color",
        isCorrect: true,
        explanation:
          "The color property in CSS is used to set the color of text.",
      },
      {
        id: 5,
        question: "What is the box model in CSS?",
        userAnswer:
          "A concept that describes how elements are sized and spaced",
        correctAnswer:
          "A concept that describes how elements are sized and spaced",
        isCorrect: true,
        explanation:
          "The CSS box model describes how elements are sized and spaced, including content, padding, border, and margin.",
      },
    ],
  },
];
