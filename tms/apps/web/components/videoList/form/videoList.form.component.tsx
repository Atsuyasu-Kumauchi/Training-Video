
import { ListQueryConfig, VIDEO_LIST } from "@/common/apiEnpoint";
import { IVideoListDto } from "@/common/dto";
import { AuthServer, queryClient, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import {
  defaultValues,
  TVideoListFormComponentSchema,
  TVideoListSchema,
  videoListSchema,
} from "./videoList.form.type";
import VideoListFormView from "./videoList.form.view";

export default function VideoListFormComponent({ modalRef, editData, isEdit }: TVideoListFormComponentSchema) {

  const formRef = useRef<TUiFormRef<TVideoListSchema>>(null);
  const videoListMutation = useMutation({
    mutationKey: isEdit ? ["video-list-update"] : ["video-list-create"],
    mutationFn: async (data: TVideoListSchema) => {
      const response = await AuthServer({
        method: isEdit ? "PUT" : "POST",
        url: isEdit ? VIDEO_LIST.UPDATE(editData?.videoId?.toString() ?? "0") : VIDEO_LIST.CREATE,
        data,
      });
      await wait();
      return response.data;
    },
    onSuccess: () => {
      formRef.current?.reset();
      modalRef?.current?.modalClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ListQueryConfig.VIDEO_LIST.key });
    },
  });

  const onSubmit: TFormHandlerSubmit<TVideoListSchema> = (value) => {
    console.log(value);

    const modifiedValue = {
      ...value,
      testId: 1,
      fileName: value.fileResponse?.fileName,
      videoUrl: value.fileResponse?.playbackUrl,
    };
    delete modifiedValue.fileResponse;
    videoListMutation.mutate(modifiedValue as TVideoListSchema);
  };

  return (
    <UiForm
      schema={videoListSchema}
      initialValues={defaultValues(isEdit, editData as IVideoListDto)}
      onSubmit={onSubmit}
      ref={formRef}
    >
      <VideoListFormView formRef={formRef} modalRef={modalRef} isEdit={isEdit} />
    </UiForm>
  );
}
