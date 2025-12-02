import { useLang } from "@/lang";
import { Button } from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function RolesListHeader() {
  const { setIsOpen } = useSettings();
  const { role } = useLang();
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{role.header.title}</h2>
      </div>
      <Button onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon
          icon={faPlus}
          className="fas fa-users w-5 h-5 mr-3 text-white"
        />
        {role.header.add}
      </Button>
    </div>
  );
}
