import { Button, UiFormInput } from "@/tmsui";
import { TUserSchema } from "./user.form.type";

export default function UserFormView() {
    return (
        <>
            <UiFormInput<TUserSchema> name="name" label="Name" placeholder="Enter your text here.." />
            <Button type="submit">Submit</Button>
        </>
    )
}
