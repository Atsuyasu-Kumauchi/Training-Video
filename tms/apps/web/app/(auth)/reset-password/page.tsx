import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ResetPasswordComponent = dynamic(() => import('@/components/auth/reset-password/resetPassword.component'))

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordComponent />
        </Suspense>
    )
}
