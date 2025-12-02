import useLang from "@/lang";
import { Modal, TFormHandlerSubmit, TUiFormRef, UiForm } from "@/tmsui";
import { useSettings } from "@/tmsui/store/settings";
import { useRef } from "react";
import {
  initialValues,
  TVideoListSchema,
  videoListSchema,
} from "./videoList.form.type";
import VideoListFormView from "./videoList.form.view";

export default function VideoListFormComponent() {
  const { videoList } = useLang();
  const { isOpen, setIsOpen } = useSettings();
  const formRef = useRef<TUiFormRef<TVideoListSchema>>(null);

  const onSubmit: TFormHandlerSubmit<TVideoListSchema> = (value) => {
    console.log("value of video list form", value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={videoList.form.title}
    >
      <UiForm
        schema={videoListSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        ref={formRef}
      >
        <VideoListFormView />
      </UiForm>
    </Modal>
  );
}
