type BadgeProps = {
    status: string;
};

export function Badge({ status }: BadgeProps) {
    switch (status) {
        case 'Active':
            return (
                <span className="inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {status}
                </span>
            );

        case 'Inactive':
            return (
                <span className="inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {status}
                </span>
            );

        case 'Pending':
            return (
                <span className="inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {status}
                </span>
            );

        case 'Cancelled':
            return (
                <span className="inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {status}
                </span>
            );

        default:
            return (
                <span className="inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {status}
                </span>
            );
    }
}
