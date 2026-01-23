
import { Messages } from "@/common";
import { ListQueryConfig, VIDEO_LIST } from "@/common/apiEnpoint";
import { IVideoListDto } from "@/common/dto";
import { useToast } from "@/hooks";
import { AuthServer, onErrorType, queryClient, TFormHandlerSubmit, TUiFormRef, UiForm, wait } from "@/tmsui";
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
  const { toastError, toastSuccess } = useToast()
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
      toastSuccess(Messages.OPERATION_SUCCESS)
    },
    onError: (error: onErrorType) => {
      toastError(error?.error?.response?.data?.message ?? Messages.OPERATION_FAILED)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ListQueryConfig.VIDEO_LIST.key });
    },
  });

  const onSubmit: TFormHandlerSubmit<TVideoListSchema> = (value) => {
    const modifiedValue = {
      ...value,
      fileName: value.fileResponse?.fileName,
      videoUrl: value.fileResponse?.playbackUrl,
      status: Boolean(value.status),
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
      <VideoListFormView
        modalRef={modalRef}
        isEdit={isEdit}
        isPending={videoListMutation.isPending}
        editData={editData}
      />
    </UiForm>
  );
}
