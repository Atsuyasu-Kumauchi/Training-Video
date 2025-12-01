import { useLang } from '@/lang';
import { Button } from '@/tmsui';
import { useSettings } from '@/tmsui/store';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment } from 'react/jsx-runtime';

export default function CreateTestListHeader() {
    const { setIsOpen } = useSettings();
    const { testCreation } = useLang();
    return (
        <Fragment>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{testCreation.header.title}</h2>
                </div>
                <Button
                    onClick={() => setIsOpen(true)}
                    color="primary"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                    <FontAwesomeIcon icon={faPlus} className="fas fa-users w-5 h-5 mr-3 text-white" />
                    {testCreation.header.addNewTest}
                </Button>
            </div>
        </Fragment>
    )
}
