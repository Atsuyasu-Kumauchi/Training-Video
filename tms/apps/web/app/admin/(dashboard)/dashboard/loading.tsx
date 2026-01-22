import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <FontAwesomeIcon icon={faCoffee} className="text-brown-600" />
        </div>
    )
}
