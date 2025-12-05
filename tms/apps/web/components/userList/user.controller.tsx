"use client"
import UserFormComponent from './form/user.form.component'
import UserListComponent from './list/user.list.component'
import UserListFilter from './list/user.list.filter'
import UserListHeader from './list/user.list.header'

export default function UserController() {
    return (
        <div className="px-6 py-8">
            <UserListHeader />
            <UserListFilter />

            {/* Users Table Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <UserListComponent />
                <UserFormComponent />
                {/* Pagination */}
                {/* <div className="px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-700">
                            <span>1〜5件 / 全5件を表示</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                前へ
                            </button>
                            <button className="px-3 py-1 text-sm text-white bg-primary-600 border border-primary-600 rounded-md">
                                1
                            </button>
                            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                次へ
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
