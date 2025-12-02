import {
  Button,
  UiFormInput
} from "@/tmsui";
import { useSettings } from "@/tmsui/store";
import { TCreateTestSchema } from "./createTest.form.type";

export default function CreateTestFormView() {
  const { setIsOpen } = useSettings();
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <UiFormInput<TCreateTestSchema> name="name" label="Training" />
      </div>
      <div className="col-span-12 flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          color="neutral"
          onClick={() => setIsOpen(false)}
        >
          Cancle
        </Button>
        <Button type="submit">Create Test</Button>
      </div>
    </div>
  );
}
