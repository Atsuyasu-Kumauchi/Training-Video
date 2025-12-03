import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const AssignmentReviewController = dynamic(() => import('@/components/assignmentReview/assignmentReview.controller'))

export const metadata: Metadata = {
    title: "課題レビュー - 管理者ダッシュボード",
};

export default function AssignmentReviewPage() {
    return (
        <AssignmentReviewController />
    )
}
