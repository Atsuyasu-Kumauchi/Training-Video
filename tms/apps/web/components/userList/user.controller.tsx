"use client"
import { Suspense } from 'react'
import UserListComponent from './list/user.list.component'
import UserListFilter from './list/user.list.filter'
import UserListHeader from './list/user.list.header'

export default function UserController() {
    return (
        <div className="px-6 py-8">
            <UserListHeader />
            <Suspense fallback={<div>Loading...</div>}>
                <UserListFilter />
            </Suspense>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <UserListComponent />
            </div>
        </div>
    )
}
