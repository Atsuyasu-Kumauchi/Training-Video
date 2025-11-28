import UserFormComponent from './form/user.form.component'
import UserListComponent from './list/user.list.component'
import UserListHeader from './list/user.list.header'
import UserListSearch from './list/user.list.search'

export default function UserController() {
    return (
        <div className="px-6 py-8">
            <UserListHeader />

            <UserListSearch />

            {/* Users Table Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <UserListComponent />
                <UserFormComponent />
                {/* Pagination */}
                <div className="px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-700">
                            <span>Showing 1 to 5 of 5 results</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-1 text-sm text-white bg-primary-600 border border-primary-600 rounded-md">
                                1
                            </button>
                            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
