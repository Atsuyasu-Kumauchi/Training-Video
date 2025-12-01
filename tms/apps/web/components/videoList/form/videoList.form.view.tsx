import { Button } from "@/tmsui";
import { useSettings } from "@/tmsui/store/settings";
import { Fragment } from "react/jsx-runtime";

export default function VideoListFormView() {
    const { setIsOpen } = useSettings();
    return (
        <Fragment>
            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" color="neutral" onClick={() => setIsOpen(false)}>Cancle</Button>
                <Button type="submit">Add Video</Button>
            </div>
        </Fragment>
    )
}
