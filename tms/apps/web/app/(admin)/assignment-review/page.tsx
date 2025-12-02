"use client"
import dynamic from 'next/dynamic'
const AssignmentReviewController = dynamic(() => import('@/components/assignmentReview/assignmentReview.controller'), {
    ssr: false,
})

export default function AssignmentReviewPage() {
    return (
        <AssignmentReviewController />
    )
}
