import { useLang } from '@/lang';
import { Fragment } from 'react/jsx-runtime';

export default function AssignmentReviewListHeader() {
    const { assignmentReview } = useLang();
    return (
        <Fragment>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{assignmentReview.header.title}</h2>
                    <p className="text-gray-600 mt-1">{assignmentReview.header.description}</p>
                </div>
            </div>

        </Fragment>
    )
}
