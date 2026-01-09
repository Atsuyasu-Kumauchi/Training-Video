import { QuestionComponentProps } from './question.type';
import QuestionView from './question.view';

export default function QuestionComponent(props: QuestionComponentProps) {
    return (
        <QuestionView {...props} />
    )
}
