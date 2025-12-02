
import useLang from "@/lang";
import { Button } from "@/tmsui";
import { useSettings } from "@/tmsui/store/settings";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react/jsx-runtime";

export default function DepartmentsListHeader() {
    const { department } = useLang();
    const { setIsOpen } = useSettings();
    return (
        <Fragment>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{department.header.title}</h2>
                </div>
                <Button onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="fas fa-users w-5 h-5 mr-3 text-white"
                    />
                    {department.header.add}
                </Button>
            </div>
        </Fragment>
    )
}
