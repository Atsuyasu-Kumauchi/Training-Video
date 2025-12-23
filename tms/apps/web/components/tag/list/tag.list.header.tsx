import useLang from "@/lang";
import { Button } from "@/tmsui";
import { useSettings } from "@/tmsui/store/settings";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserListHeader() {
    const { setIsOpen } = useSettings();
    const { tag } = useLang();
    return (<>
        {/* Page Header */}
        < div className="flex items-center justify-between mb-8" >
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{tag.header.title}</h1>
            </div>
            <Button onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon
                    icon={faPlus}
                    className="fas fa-users w-5 h-5 mr-3 text-white"
                />
                {tag.header.add}
            </Button>
        </div >
    </>)
}