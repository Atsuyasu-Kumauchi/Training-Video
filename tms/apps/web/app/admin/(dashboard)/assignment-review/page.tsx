import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const AssignmentReviewController = dynamic(() => import('@/components/assignmentReview/assignmentReview.controller'))

export const metadata: Metadata = {
    title: "課題レビュー - 管理者ダッシュボード",
};

export default function AssignmentReviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AssignmentReviewController />
        </Suspense>
    )
}
